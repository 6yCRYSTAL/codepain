class Api::V1::PensController < ApplicationController
  respond_to :json
  # TODO:等到USER可以登入後就要加入
  # before_action :authenticate_user!
  
  def create
    @pen = Pen.new(clear_params)

    if @pen.save
      p @pen
      redirect_to edit_pen_path(@pen, username: 'yayayayaya')
    else
      redirect_to new_pen_path
    end
  end

  private
  def clear_params
    params.require(:pen).permit(:title, :html, :css, :js)
  end

end
