class PensController < ApplicationController

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
  end

  private

  def pens_params
    params.require(:pen).permit(:title, :html, :css, :js, :random_url)
    # pens_params.merge(:)
  end
end
