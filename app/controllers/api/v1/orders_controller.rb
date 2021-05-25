class Api::V1::OrdersController < ApplicationController
  before_action :authenticate_user!
  # 注意!!以下是csrf豁免
  skip_before_action :verify_authenticity_token, only: [:result, :client]

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
        'ReturnURL' => 'https://c09324c8aea2.ngrok.io/api/v1/orders/result', # 使用 ngrok 測試
        'ClientBackURL' => 'https://c09324c8aea2.ngrok.io/api/v1/orders/client'# 使用 ngrok 測試
      }
      # 先不帶入發票
      inv_params = {}

      create = ECpayPayment::ECpayPaymentClient.new
      order_details = create.aio_check_out_credit_onetime(params: base_param, invoice: inv_params)

      render html: order_details.html_safe
    else
      redirect_to product_path(plan: @product.plan, period: @product.period)
    end
  end

  def result
    # 交易成功
    if params[:RtnCode] == '1'

      # 整理 ecpay 回傳的資料
      succeeded_order = Order.find_by(serial: ecpay_params[:MerchantTradeNo]) # 交易成功的訂單
      purchased_product = succeeded_order.product
      purchased_plan = purchased_product.plan # 購買的產品
      paid_user = succeeded_order.user # 購買的 user

      case ecpay_params[:PaymentType]
      when 'Credit_CreditCard'
        payment_method = 'credit_onetime' # 付費方式
      end

      succeeded_order.update(
        payment_method: payment_method,
        purchased_at: ecpay_params[:PaymentDate].to_datetime.to_s(:db),
        ecpay_tradeno: ecpay_params[:TradeNo],
        ecpay_chargefee: ecpay_params[:PaymentTypeChargeFee],
        ecpay_check_mac_value: ecpay_params[:CheckMacValue]
      )

      # 找出購買產品的 period
      if purchased_product.period == 'year'
        expired_date = ecpay_params[:PaymentDate].to_datetime.next_year.to_s(:db)
      else
        expired_date = ecpay_params[:PaymentDate].to_datetime.next_month.to_s(:db)
      end

      paid_user.update(
        membership: purchased_plan,
        subscribed_at: succeeded_order.purchased_at,
        expired_at: expired_date
      )

      render plain: '1|OK'
    else
      redirect_to products_url, notice: '交易失敗'
    end
  end

  # 綠界轉址到這邊
  def client
    redirect_to 'https://c09324c8aea2.ngrok.io/your-work'
  end

  private

  def ecpay_params
    params.permit(
      :MerchantTradeNo,
      :TradeNo,
      :PaymentDate,
      :PaymentType,
      :PaymentTypeChargeFee,
      :CheckMacValue
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