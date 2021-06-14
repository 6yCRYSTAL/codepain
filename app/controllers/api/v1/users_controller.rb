class Api::V1::UsersController < Api::ApiController
  respond_to :json
  before_action :find_user

  def membership
    success!({ ownerMembership: @user.membership })
  end

  def check_user
    success!({ checkUser: (@user == current_user) })
  end

  private

  def find_user
    @user = User.find_by!(username: params[:username])
  end
end