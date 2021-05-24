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
  
end