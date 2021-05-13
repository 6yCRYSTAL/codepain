class PensController < ApplicationController
  # TODO:等到USER可以登入後就要加入
  # before_action :authenticate_user!, except: [:new]

  def index
    @pens = Pen.all
    @deleted_pens = Pen.deleted_in_1_hour
  end
  
  def new
    @pen = Pen.new
  end

  def create
  end

  def edit
    current_pen
  end
  
  def show
  end

  def destroy
    # @pen = current_user.pens.find_by(:random_url)
    # TODO:等到USER可以登入後就要加入current_user
    @pen = Pen.find_by(random_url: params[:random_url])
    @pen.update(state: 'soft_deleting')
    # soft_delete the pen
    @pen.destroy
    redirect_to root_path, notice: "DELETED!!!"
  end

  private

  def current_pen
    @pen = Pen.find_by(random_url: params[:random_url])
    redirect_to pens_path if @pen.nil?
  end
end
