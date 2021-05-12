class PensController < ApplicationController
  # before_action :authenticate_user!, except: [:new]
  
  def index
    @pens = Pen.all
  end
  
  def new
    @pen = Pen.new
  end

  def create
  end

  def edit
    # @pen = Pen.find_by(parmas[:id])
  end
  
  def show
    
  end

  def update
    if @pen.update(pen_params)
      flash[:notice] = 'Pen saved.'
      #redirect_to , notice: '成功修改資料'
    else
      #render :edit
    end
  end

  def destroy
    # @pen = current_user.pens.find_by(:random_url)
    #測試用
    @pen = Pen.find_by(random_url: params[:random_url])
    @pen.destroy
    redirect_to root_path, notice: "DELETED!!!"
  end

  private

  # def pen_params
  #   params.require(:pen).permit(:title, :html, :css, :js)
  # end

end
