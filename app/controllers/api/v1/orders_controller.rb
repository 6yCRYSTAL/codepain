class Api::V1::OrdersController < ApplicationController
  before_action :authenticate_user!, except: [:result]
  # 注意!!以下是csrf豁免
  skip_before_action :verify_authenticity_token, only: [:result]

  def create
    find_product
    # 新增訂單
    order = @product.orders.new(
      user_id: current_user.id,
      total_amount: @product.price
    )

    if order.save
      # 引入 ecpay
      require 'ecpay_payment'
      # 把指定的參數帶入
      base_param = {
        'MerchantTradeNo' => order.serial,  #請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
        'MerchantTradeDate' => order.created_at.to_s(:db).gsub('-', '/'), # ex: 2017/02/13 15:45:30
        'TotalAmount' => order.total_amount,
        'TradeDesc' => @product.desc,
        'ItemName' => "#{@product.plan}: #{@product.period}",
        'ReturnURL' => 'https://3cd71269e7ef.ngrok.io/api/v1/orders/result' # 使用 ngrok 測試
      }
      # 先不帶入發票
      inv_params = {}

      create = ECpayPayment::ECpayPaymentClient.new
      htm = create.aio_check_out_credit_onetime(params: base_param, invoice: inv_params)

      render html: htm.html_safe
    else
      redirect_to product_path(plan: @product.plan, period: @product.period)
    end
  end

  def result
    payment_result_details

    if ecpay_params[:RtnMsg] == '交易成功'

      succeeded_order.update(result_details)

      paid_user.update(
        membership: purchased_plan,
        subscribed_at: result_details.purchased_at
        expired_at: expired_date
      )
    else
      redirect_to product_path(
        plan: purchased_plan,
        period: purchased_product.period), notice: '交易失敗'
    end
    byebug
    redirect_to products_path
  end

  private

  def payment_result_details
    succeeded_order = Order.find_by(serial: ecpay_params[:MerchantTradeNo])
    purchased_product = succeeded_order.product
    purchased_plan = purchased_product.plan
    paid_user = succeeded_order.user

    if purchased_product.period == 'year'
      expired_date = ecpay_params[:PaymentDate].to_datetime.next_year.to_s(:db)
    else
      expired_date = ecpay_params[:PaymentDate].to_datetime.next_month.to_s(:db)
    end

    result_details = {
      payment_method: payment_method,
      purchased_at: ecpay_params[:PaymentDate].to_datetime.to_s(:db),
      ecpay_tradeno: ecpay_params[:TradeNo],
      ecpay_chargefee: ecpay_params[:PaymentTypeChargeFee],
      ecpay_check_mac_value: ecpay_params[:CheckMacValue]
    }
  end

  def payment_method
    case ecpay_params[:PaymentType]
    when 'Credit_CreditCard'
      'credit_onetime'
    end
  end

  def ecpay_params
    clear_params = params.permit(
      :MerchantTradeNo,
      :TradeNo,
      :PaymentDate,
      :PaymentType,
      :PaymentTypeChargeFee,
      :CheckMacValue,
      :RtnMsg
    )
  end

  def find_product
    begin
      @product = Product.find_by!('plan = ? AND period = ?',
                                   params[:plan], params[:period])
    rescue
      redirect_to pens_path
    end
  end
end