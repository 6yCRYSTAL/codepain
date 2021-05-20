class Api::V1::CommentsController < ApplicationController
  respond_to :json
  before_action :authenticate_user!

  def update
    new_content = params.permit(:content)
    comment = Comment.find(params[:id])
    comment.update(new_content)
  end

end
