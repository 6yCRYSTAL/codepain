class Api::V1::DeletedPensController < Api::ApiController
  respond_to :json

  before_action :authenticate_user!
  before_action :find_trashed_pen

  def update
    # change pen state to editing
    @pen.restore
    @pen.update(state: 'editing')
    success!({ username: @pen.user.username, random_url: @pen.random_url }, 'restore succeeded')
  end

  def destroy
    # change pen state to archived
    @pen.update(state: 'archived')
    redirect_to pens_path(item_type: 'deleted_item')
  end

  private

  def find_trashed_pen
    @pen = Pen.is_trashed.find_by!(id: params[:id])
  end
end