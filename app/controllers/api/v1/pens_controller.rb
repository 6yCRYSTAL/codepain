class Api::V1::PensController < ApplicationController
  respond_to :json

  before_action :authenticate_user!, except: [:new]

  def index
    @pens = current_user.pens
    render(json: @pens)
  end

  def create
    @pen = current_user.pens.new(clear_params)

    if @pen.save
      redirect_to edit_pen_path(@pen, username: current_user.username)
    else
      redirect_to pens_path
    end
  end

  def update
    current_pen

    if @pen.update(clear_params)
      redirect_to edit_pen_path(@pen, username: current_user.username), notice: 'UPDATED!'
    else
      redirect_to pens_path
    end
  end

  private

  def clear_params
    params.require(:pen).permit(:title, :html, :css, :js)
  end

  def current_pen
    @pen = current_user.pens.find_by(random_url: params[:random_url])
    redirect_to pens_path if @pen.nil?
  end
end