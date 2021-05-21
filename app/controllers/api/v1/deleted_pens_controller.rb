class Api::V1::DeletedPensController < ApplicationController
  respond_to :json

  before_action :authenticate_user!
  before_action :find_trashed_pen

  def update
    # change pen state to editing
    @pen.restore
    @pen.update(state: 'editing')
    redirect_to pens_path(item_type: 'deleted_item')
  end

  def destroy
    # change pen state to archived
    @pen.update(state: 'archived')
    redirect_to pens_path(item_type: 'deleted_item')
  end

  private

  def find_trashed_pen
    @pen = Pen.is_trashed.find_by(id: params[:id])
  end
end