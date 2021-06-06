module CommentsHelper

  # comment edit block
  def edit_buttons(comment)
    if current_user == comment.user
      "<button
        class='comment-edit-btn'
          data-action='click->comment-update#edit'
          data-comment-update-target='editBtn'>
          <span><i class='fas fa-pencil-alt'></i></span>
          <span>Edit</span>
        </button>
        <button
          class='comment-delete-btn'
          data-action='click->comment-delete#delete'
          data-comment-update-target='deleteBtn'>
          <span><i class='fas fa-trash'></i></span>
          <sapn>Delete</sapn>
        </button>".html_safe
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