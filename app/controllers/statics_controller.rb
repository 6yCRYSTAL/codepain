class StaticsController < ApplicationController
  require "browser"
  before_action :detect_mobile_user

  def index
    redirect_to pens_path if user_signed_in?
  end

  private

  def detect_mobile_user
    browser = Browser.new(request.user_agent)
    render 'mobile' if browser.device.mobile?
  end
end