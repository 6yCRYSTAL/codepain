class Api::V1::CommentsController < Api::ApiController
  respond_to :json
  before_action :authenticate_user!

  def index
    @pen = Pen.find_by(random_url: params[:random_url])
    @comments = @pen.comments.order(created_at: :desc).includes(:user)
  end

  def create
    pen = Pen.find_by(random_url: params[:random_url])
    content = params[:content]
    @comment = current_user.comments.new({pen: pen, user: current_user, content: content})

    if @comment.save
      render json: @comment.as_json(include: :user), status: :created
    else
      render json: { status: 'failed' }, status: :expectation_failed
    end
  end

  def update
    comment = Comment.find(params[:id])
    if user_signed_in? && current_user == comment.user
      comment.update(content: params[:content])
    end
  end

  def destroy
    comment = Comment.find_by(id: params[:id])
    if user_signed_in? && current_user == comment.user
      comment.destroy
      render json: { status: 'Destroyed' }, status: :ok
    else
      render json: { status: 'Destroy failed' }, status: :expectation_failed
    end
  end
end