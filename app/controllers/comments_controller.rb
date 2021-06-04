class CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @comment = current_user.comments.new(comment_params)

    pen = current_user.pens.find_by(random_url: params[:random_url])

    if @comment.save
      redirect_to  pen_path(pen, username: current_user.username), notice: 'YA'
    else
      redirect_to  pen_path(pen, username: current_user.username), notice: '留言新增失敗'
    end
  end

  def update
  end

  def destroy
    pen = current_comment.pen
    current_comment.destroy
    redirect_to pen_path(pen, username: current_user.username)
  end


  private

  def comment_params
    user_id = current_user.id
    pen_id = current_user.pens.find_by(random_url: params[:random_url]).id
    params.require(:comment).permit(:content).merge({user_id: user_id, pen_id: pen_id})
  end

  def current_comment
    @comment = Comment.find_by(id: params[:id])
  end
end
