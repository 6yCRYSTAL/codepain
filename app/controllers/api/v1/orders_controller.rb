class Api::V1::OrdersController < ApplicationController
  before_action :authenticate_user!

  def create
    find_product

    order = @product.orders.new(user_id: current_user.id, total_amount: @product.price)
    order.save
    
  end

  private

  def product_params
    params.require(:product).permit(:period, :plan)
  end

  def find_product
    begin
      @product = Product.find_by!('plan = ? AND period = ?',
                                   product_params[:plan], product_params[:period])
    rescue
      redirect_to pens_path
    end
  end
end