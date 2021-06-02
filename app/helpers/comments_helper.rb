module CommentsHelper

  # comment edit block
  def edit_buttons(comment)
    if current_user.id == comment.user.id
      "<button
        data-action='click->comment-update#edit'
        data-comment-update-target='editBtn'
      > Edit </button>
      <button
        data-action='click->comment-delete#delete'
        data-comment-update-target='deleteBtn'
      > Delete</button>".html_safe
    end
  end

  # comment counts
  def comments_count_text(comments_count)
    if comments_count == 0
      "<strong>No Comments</strong><br>You can be the first!".html_safe
    else
      pluralize comments_count, "comment"
    end
  end
end