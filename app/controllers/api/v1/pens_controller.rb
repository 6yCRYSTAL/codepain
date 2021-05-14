class Api::V1::PensController < ApplicationController
  respond_to :json

  before_action :authenticate_user!
  
  def create
    @pen = current_user.pens.new(clear_params)

    if @pen.save
      p @pen
      redirect_to edit_pen_path(@pen, username: current_user.username)
    else
      redirect_to pens_path
    end
  end

  def update
    find_soft_deleting_pen
    # change pen state to editing
    @pen.restore
    @pen.update(state: 'editing')
    redirect_to pens_path(item_type: 'deleted_item')
  end

  def destroy
    find_soft_deleting_pen
    # change pen state to archived
    @pen.update(state: 'archived')
    redirect_to pens_path(item_type: 'deleted_item')
  end

  private
  
  def clear_params
    params.require(:pen).permit(:title, :html, :css, :js, :username)
  end

  def find_soft_deleting_pen
    @pen = Pen.is_soft_deleting.find_by(id: params[:id])
  end
end
