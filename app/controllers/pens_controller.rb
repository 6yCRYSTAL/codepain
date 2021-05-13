class PensController < ApplicationController
  # before_action :authenticate_user!, except: [:new] 
  # after User modle complete
  layout 'layout-edit',only: [:new]
  
  def index
    @pens = Pen.all
  end
  
  def new
    @pen = Pen.new
  end

  def create
    # 看看要不要丟一包資料給前端
    # pen_path(@pen) 現在有random_url
    # @pen = Pen.new(pens_params)
    # render json: @pen.random_url
    # @pen = Pen.new(pen_params)
    # pen_params
    # p '-------------'
    # p params
    # p '-------------'
    # render js: "window.location = '#{}'"
    
    # redirect_to action: :edit
  end

  def edit
    # @pen = Pen.find_by(parmas[:id])
  end
  
  def show
    render 'pen#show'
  end

  def update
    if @pen.update(pen_params)
      flash[:notice] = 'Pen saved.'
      #redirect_to restaurant_path(@restaurant), notice: '成功修改資料'
    else
      #render :edit
    end
  end

  private

  # def pen_params
  #   params.require(:pen).permit(:title, :html, :css, :js)
  # end

end
