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
    if user_signed_in?
      if action_name == "new"
        "<button class='btn-save' id='btn-save'><span><i class='fas fa-cloud'></i></span>Save</button>".html_safe
      elsif action_name == 'edit' && current_user == @pen.user
        "<button class='btn-save' id='btn-update'><span><i class='fas fa-cloud'></i></span>Save</button>".html_safe
      end
    end
  end

  # on edit_header(new)
  def save_as_private_button
    if user_signed_in?
      if current_user.membership != "free" && action_name == "new"
        "<button class='btn-save' id='btn-save-as-private'><span><i class='fas fa-cloud'></i></span>Save as Private</button>".html_safe
      end
    end
  end

  def private_switch
    if user_signed_in?
      if current_user.membership != "free" && action_name == "edit"
        render 'shared/private_switch'
      end
    end
  end

  # on edit_header
  def pin_button
    if user_signed_in?
      "<div class='pinned-btn'>
        <button class='btn-pinned'><span><i  class='fas fa-thumbtack'></i></span></button>
        <button class='btn-pin-arrow'><span class='fas fa-chevron-down'></span></button>
      </div>".html_safe
    end
  end

  # correct user menu related buttons on edit_header
  def user_menu_button
    if user_signed_in?
      render 'shared/user_menu_box'
    else
      signup_button +
      login_button
    end
  end

  def prev_page_button(pens)
    link_to_prev_page pens,
      "<button class='prev-btn'>
        <span class='arrow-left'><i class='fas fa-chevron-right'></i></span>
        <span>Prev</span>
      </button>".html_safe
  end

  def next_page_button(pens)
    link_to_next_page pens,
      "<button class='next-btn'>
        <span>Next</span>
        <i class='fas fa-chevron-right'></i>
      </button>".html_safe
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

  def pro_logo(pen)
    "<span class='logo-pro'>pro</span>".html_safe if pen.user.membership != 'free'
  end
end