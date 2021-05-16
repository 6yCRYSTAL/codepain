class Api::V1::DeletedPensController < ApplicationController
  respond_to :json

  before_action :authenticate_user!

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

  def find_soft_deleting_pen
    @pen = Pen.is_soft_deleting.find_by(id: params[:id])
  end
end