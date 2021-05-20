class ProductsController < ApplicationController
  def index
  end

  def show
    begin
      @product = Product.find_by('plan = ? AND period = ?', params[:plan], params[:period])
    rescue
      redirect_to pens_path if @product.nil?
    end
  end
end