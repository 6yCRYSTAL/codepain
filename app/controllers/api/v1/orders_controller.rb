class Api::V1::OrdersController < ApplicationController
  before_action :authenticate_user!

  def create
    find_product
    # 新增訂單
    order = @product.orders.new(user_id: current_user.id, total_amount: @product.price)
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
        'ReturnURL' => 'localhost:3000/accounts/pro',
        'OrderResultURL' => 'localhost:3000/accounts/pro'
        # 'NeedExtraPaidInfo' => 'Y'
      }
      # 先不帶入發票
      inv_params = {}

      create = ECpayPayment::ECpayPaymentClient.new
      htm = create.aio_check_out_credit_onetime(params: base_param, invoice: inv_params)

      render html: htm.html_safe
    else
      render html: '失敗'
    end
  end

  private

  def find_product
    begin
      @product = Product.find_by!('plan = ? AND period = ?',
                                   params[:plan], params[:period])
    rescue
      redirect_to pens_path
    end
  end
end