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
  end

end
