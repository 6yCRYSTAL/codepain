class RenderCommentJob < ApplicationJob
  queue_as :urgent

  def perform(pen)
    render 'comment' , pen: pen, comments: pen.comments, comments_count: pen.comments_count
  end
end
