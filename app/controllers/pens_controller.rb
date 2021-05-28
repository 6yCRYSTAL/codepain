class PensController < ApplicationController
  before_action :authenticate_user!, except: [:search_all_users]
  layout false
  before_action :find_user_pen, only: [:show, :edit, :destroy, :make_private]
  # impressionist :actions=>[:edit]

  def index
    # pens tab / all or search
    if !current_user
      redirect_to :root
    else
      @pens = search_pen(params[:search]).includes(:comments)

      # deleted tab
      @deleted_pens = current_user.pens.deleted_in_1_hour

      # for Comment
      @comment = current_user.comments.new
      render layout: "application"
    end
  end

  def new
    @pen = Pen.new
    render layout: "edit"
  end

  def show
    @comments = @pen.comments.all.order(id: :desc)
    @comments_count = @pen.comments_count
    @comment = current_user.comments.new

    render layout: "show"
    respond_to do |format|
      format.js
      format.html
    end
  end

  def edit
    if @pen.private && current_user != @pen.user
      redirect_to pens_path, alert: "This is a private pen. Please contact the owner for more information."
    else
      render layout: "edit"
      begin
        impressionist(@pen)
      rescue
      end
    end
  end

  def destroy
    if current_user && current_user == @pen.user
      # change pen state
      @pen.update(state: 'trashed')
      # soft_delete the pen
      @pen.destroy
      redirect_to pens_path, notice: "DELETED!!!"
    else
      redirect_to :root
    end
  end

  def make_private
    unless current_user.membership == 'free'
      @pen.toggle(:private)
    else
      alert("Upgrade to PRO and unlock Privacy and more.")
    end
  end

  def search_all_users
    begin
      @pens = Pen.search(params[:q]).includes(:user).page(params[:page]).per(6)
    rescue
      @pens = Pen.includes(:user).page(params[:page]).per(6)
    end
    render layout: "application"
  end

  private

  def search_pen(keyword)
    # 如果沒搜尋 那就給他user所有的pens
    return current_user.pens if keyword.nil?
    # 有搜尋的話就去db撈資料
    current_user.pens.search(keyword)
  end

  def find_user_pen
    begin
      @pen = Pen.find_by!(random_url: params[:random_url])
    rescue
      redirect_to pens_path
    end
  end
end