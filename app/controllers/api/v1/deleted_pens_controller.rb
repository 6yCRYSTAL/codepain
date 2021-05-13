class Api::V1::DeletedPensController < ApplicationController
  respond_to :json
  # TODO:等到USER可以登入後就要加入
  # before_action :authenticate_user!

  def update
    find_deleted_pen
    @pen.update
  end

  def destroy

  end

  private
  def find_deleted_pen
    @pen = Pen.only_deleted.find_by(id: params[:id])
  end
end