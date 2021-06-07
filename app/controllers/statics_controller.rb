class StaticsController < ApplicationController
  def index
    redirect_to pens_path if user_signed_in?
  end
end
