class Api::V1::CommentsController < ApplicationController
  respond_to :json
  before_action :authenticate_user!

  def create
    pen_id = Pen.find_by(random_url: params[:random_url]).id
    user_id = current_user.id
    content = params[:content]
    @comment = current_user.comments.new({pen_id: pen_id, user_id: user_id, content: content  })

    if @comment.save
      render json: @comment.as_json(include: :user), status: 201
    else
      render json: { status: 'failed' }, status:	403
    end
  end

  def update
    new_content = params.permit(:content)
    comment = Comment.find(params[:id])
    comment.update(new_content)
  end
end