class Api::V1::CommentsController < ApplicationController
  respond_to :json
  before_action :authenticate_user!

  def create
    pen_id = Pen.find_by(random_url: params[:random_url]).id
    user_id = current_user.id
    content = params[:content]
    @comment = current_user.comments.new({pen_id: pen_id, user_id: user_id, content: content  })

    if @comment.save
      render json: @comment.as_json(include: :user), status: :created
    else
      render json: { status: 'failed' }, status: :expectation_failed
    end
  end

  def update
    new_content = params.permit(:content)
    comment = Comment.find(params[:id])
    comment.update(new_content)
  end

  def destroy
    comment = Comment.find_by(id: params[:id])
    if current_user && current_user == comment.user
      comment.destroy
      render json: { status: 'Destroied' }, status: :ok
    else
      render json: { status: 'Destroy failed' }, status: :expectation_failed
    end
  end
end


def find_user_pen
  begin
    @pen = Pen.find_by!(random_url: params[:random_url])
  rescue
    redirect_to pens_path
  end
end