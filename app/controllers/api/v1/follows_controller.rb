class Api::V1::FollowsController < Api::ApiController
  include Searchable
  before_action :find_user_pen
  def list
    
  end

  def follow
    if user_signed_in?
      current_user.following << @pen.user
      success!({ boolean: current_user.following.exists?(@pen.user) }, 'following')
    else
      redirect_to new_user_session_path
    end
  end

  def unfollow
    current_user.following.destroy(@pen.user)
    success!({ boolean: current_user.following.exists?(@pen.user) }, 'unfollowed')
  end
end