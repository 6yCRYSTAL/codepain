class Api::V1::PensController < ApplicationController
  respond_to :json

  before_action :authenticate_user!
  
  def create
    @pen = current_user.pens.new(clear_params)

    if @pen.save
      p @pen
      redirect_to edit_pen_path(@pen, username: current_user.username)
    else
      redirect_to pens_path
    end
  end

  private
  def clear_params
    params.require(:pen).permit(:title, :html, :css, :js, :username)
  end

end
