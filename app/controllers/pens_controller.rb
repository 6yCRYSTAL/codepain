class PensController < ApplicationController
  layout 'edit',only: [:new]
  
  before_action :authenticate_user!, except: [:new]

  def index
    @pens = Pen.all
    @deleted_pens = Pen.deleted_in_1_hour
  end
  
  def new
    @pen = Pen.new
  end

  def edit
    current_pen
  end

  def destroy
    @pen = current_user.pens.find_by(random_url: params[:random_url])
    # change pen state
    @pen.update(state: 'soft_deleting')
    # soft_delete the pen
    @pen.destroy
    redirect_to pens_path, notice: "DELETED!!!"
  end

  private

  def current_pen
    @pen = Pen.find_by(random_url: params[:random_url])
    redirect_to pens_path if @pen.nil?
  end
end
