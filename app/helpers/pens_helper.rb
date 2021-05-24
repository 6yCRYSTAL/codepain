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
    if current_user && current_user == @pen.user
      if action_name == "new"
        "<button class='btn-save' id='btn-save'><span><i class='fas fa-cloud'></i></span>Save</button>".html_safe
      elsif action_name == 'edit'
        "<button class='btn-save' id='btn-update'><span><i class='fas fa-cloud'></i></span>Save</button>".html_safe
      end
    end
  end

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
end