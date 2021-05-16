class PensController < ApplicationController
  layout 'edit',only: [:new]
  
  before_action :authenticate_user!, except: [:new]

  def index
    @pens = current_user.pens.all
    @deleted_pens = current_user.pens.deleted_in_1_hour
  end
  
  def new
    @pen = Pen.new
  end

  def show
    current_pen
    @comments = current_pen.comments.all.order(id: :desc)
    @comments_counts = @comments.count
    @comment = current_user.comments.new
    @current_user = current_user

    respond_to do |format|
      format.js 
      format.html
    end
  end

  def edit
    current_pen
  end

  def destroy
    current_pen
    # change pen state
    @pen.update(state: 'soft_deleting')
    # soft_delete the pen
    @pen.destroy
    redirect_to pens_path, notice: "DELETED!!!"
  end

  private

  def current_pen
    @pen = current_user.pens.find_by(random_url: params[:random_url])
    return (@pen) || (redirect_to pens_path )
  end

end
