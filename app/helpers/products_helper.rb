module ProductsHelper

  def pro_form_left
    if @product.period == 'year'
      render 'products/annual'
    else
      render 'products/monthly'
    end
  end

end