class PensController < ApplicationController
  def index
    @pens = Pen.all
  end
  
  def new
    @pen = Pen.new
  end

  def create
    # 看看要不要丟一包資料給前端
    
  end
end
