class ProductsController < ApplicationController
  def index
  end

  def show
    @product = Product.find_by('plan = ? AND period = ?', params[:plan], params[:period])

    render layout: "user"
  end
end