module PensHelper

  # username show on edit_header
  def show_username
    if action_name == "new"
      begin
        current_user.username
      rescue
        "Captain Anonymous"
      end
    elsif action_name == "edit"
      @pen.user.username
    end
  end

  # login/signup buttons
  def signup_button
    if controller_name != 'registrations'
      link_to "Sign Up", new_user_registration_path, class: 'login-signup-Buttons', data: {buttons: 'signup'}
    end
  end

  def login_button
    if controller_name != 'sessions'
      link_to "Log In", login_path, class: 'login-signup-Buttons', data: {buttons: 'login'}
    end
  end

  # save button on edit_header
  def save_button
    if current_user
      if action_name == "new"
        "<button class='btn-save' id='btn-save'><span><i class='fas fa-cloud'></i></span>Save</button>".html_safe
      elsif action_name == 'edit' && current_user == @pen.user
        "<button class='btn-save' id='btn-update'><span><i class='fas fa-cloud'></i></span>Save</button>".html_safe
      end
    end
  end

  # save as private button on edit_header(new)
  def save_as_private_button
    begin
      if current_user.membership != "free" && action_name == "new"
        "<button class='btn-save' id='btn-save-as-private'><span><i class='fas fa-cloud'></i></span>Save as Private</button>".html_safe
      end
    rescue
    end
  end

  # def private_switch
  #   if current_user.membership != "free" && action_name == "edit"

  # end

  # pin button on edit_header
  def pin_button
    if current_user
      "<div class='pinned-btn'>
        <button class='btn-pinned'><span><i  class='fas fa-thumbtack'></i></span></button>
        <button class='btn-pin-arrow'><span class='fas fa-chevron-down'></span></button>
      </div>".html_safe
    end
  end

  # correct user menu related buttons on edit_header
  def user_menu_button
    if current_user
      render 'shared/user_menu_box'
    else
      signup_button +
      login_button
    end
  end

  def prev_page_button(pens)
    link_to path_to_prev_page(pens) do
      "<button class='prev-btn'>
        <span class='arrow-left'><i class='fas fa-chevron-right'></i></span>
        <span>Prev</span>
      </button>".html_safe
    end
  end

  def next_page_button(pens)
    link_to path_to_next_page(pens) do
      "<button class='next-btn'>
        <span>Next</span>
        <i class='fas fa-chevron-right'></i>
      </button>".html_safe
    end
  end

  # prev and next page button
  def page_buttons(pens)
    if pens.first_page?
      next_page_button(pens)
    elsif pens.last_page?
      prev_page_button(pens)
    else
      prev_page_button(pens) +
      next_page_button(pens)
    end
  end

  # comment counts
  def comments_count_text(comments_count)
    if comments_count == 0
      "<p>
        <strong>No Comments</strong>
        <br>
        You can be the first!
      </p>".html_safe
    else
      pluralize comments_count, "comment"
    end
  end
end