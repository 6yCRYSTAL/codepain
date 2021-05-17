class Api::V1::PensController < ApplicationController
  respond_to :json

  before_action :authenticate_user!, except: [:new]

  def index
    @pens = current_user.pens
    p "YOU GOOD!! GET PENS DATA!!"
    render(json: @pens)
  end
  
  def create
    @pen = current_user.pens.new(pen_params)
    p "#{pen_params}----------"
    if @pen.save
      redirect_to edit_pen_path(@pen, username: current_user.username)
    else
      redirect_to pens_path
    end
  end

  def update
    current_pen

    if @pen.update(pen_params)
      redirect_to edit_pen_path(@pen, username: current_user.username), notice: 'UPDATED!'
    else
      redirect_to pens_path
    end
  end

  def love_list
    @pen = Pen.find_by(random_url: love_params[:random_url])

    if current_user.loved?(@pen)
      current_user.love_pens.destroy(@pen)
    else
      current_user.love_pens << @pen
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

  def current_pen
    @pen = current_user.pens.find_by(random_url: params[:random_url])
    redirect_to pens_path if @pen.nil?
  end
end
