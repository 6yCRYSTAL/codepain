module CommentsHelper

  # comment counts
  def comments_count_text(comments_count)
    if comments_count == 0
      "<strong>No Comments</strong><br>You can be the first!".html_safe
    else
      pluralize comments_count, "comment"
    end
  end
end