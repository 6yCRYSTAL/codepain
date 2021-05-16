class CommentsController < ApplicationController
  before_action :authenticate_user!
  
  def create
    @comment = current_user.comments.new(clear_params)
    pen = current_pen

    if @comment.save
      redirect_to  pen_path(pen, username: current_user.username), notice: 'YA'
    else
      redirect_to  pen_path(pen, username: current_user.username), notice: '留言新增失敗'
    end
  end


  private

  def clear_params
    user_id = current_user.id
    pen_id = current_user.pens.find_by(random_url: params[:random_url]).id
    params.require(:comment).permit(:content).merge({user_id: user_id, pen_id: pen_id})
  end

  def current_pen
    @pen = current_user.pens.find_by(random_url: params[:random_url])
    return (@pen) || (p params )
  end


  def find_soft_deleting_pen
    @pen = Pen.is_soft_deleting.find_by(id: params[:id])
  end
end
