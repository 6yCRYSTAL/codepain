class StaticsController < ApplicationController
  def index
    if current_user
      redirect_to pens_path
    end
  end
end
