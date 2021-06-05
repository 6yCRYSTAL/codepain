class StaticsController < ApplicationController
  def index
    if user_signed_in?
      redirect_to pens_path
    end
  end
end
