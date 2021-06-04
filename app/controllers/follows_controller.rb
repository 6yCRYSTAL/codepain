class FollowsController < ApplicationController
  before_action :find_user_pen

  def follow
    if user_signed_in?
      current_user.following << @pen.user
    else
      redirect_to new_user_session_path
    end
  end

  def unfollow
    current_user.following.destroy(@pen.user)
  end
end