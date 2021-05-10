class PensController < ApplicationController
  def index
    @pens = Pen.all
  end
  
  def new
    @pen = Pen.new
  end
end
