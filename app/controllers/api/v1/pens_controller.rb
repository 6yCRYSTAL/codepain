class Api::V1::PensController < ApplicationController
  respond_to :json

  before_action :authenticate_user!, except: [:new]
  before_action :find_user_pen, only: [:edit, :update]

  # TODO username key不會顯示在 api 上
  def index
    @pens = current_user.pens
    render(
      json: @pens,
      username: current_user.username
    )
  end

  def create
    @pen = current_user.pens.new(pen_params)
    if @pen.save
      redirect_to edit_pen_path(@pen, username: current_user.username)
    else
      redirect_to pens_path
    end
  end

  def edit
    render(json: @pen)
  end

  def update
    if @pen.update(pen_params)
      render json: { status: 'update succeeded' }
    else
      render json: { status: 'update failed' }
    end
  end

  # TODO 要開多少人喜歡(數量)、愛心的狀態(布林)
  def love_list
    @pen = Pen.find_by(random_url: love_params[:random_url])

    if current_user.loved?(@pen)
      current_user.love_pens.destroy(@pen)
      render json: { status: 'removed' }
    else
      current_user.love_pens << @pen
      render json: { status: 'added' }
    end
  end

  private

  def love_params
    params.permit(:random_url)
  end

  def pen_params
    clean_params = params.require(:pen).permit(:title, :html, :css, :js)
    if clean_params[:title] == "Untitled"
      clean_params.merge(title: "A Pen by #{current_user.display_name}")
    else
      clean_params
    end
  end

  def find_user_pen
    begin
      @pen = current_user.pens.find_by(random_url: params[:random_url])
    rescue
      redirect_to pens_path
    end
  end
end
