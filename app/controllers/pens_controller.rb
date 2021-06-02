class PensController < ApplicationController
<<<<<<< HEAD
  before_action :find_user_pen, only: [:show, :edit, :destroy, :make_private]
=======
  layout false
  before_action :authenticate_user!
  before_action :find_user_pen, only: [:show, :edit, :destroy]
>>>>>>> refs/remotes/origin/show_page
  # impressionist :actions=>[:edit]

  def index
    # pens tab / all or search
    unless current_user
      redirect_to :root
    else
      search_user_pen(params[:page])
      search_user_pen(1) if @pens.current_page > @pens.total_pages

      # deleted tab
      @deleted_pens = current_user.pens.deleted_in_1_hour

    # for Comment
    @comment = current_user.comments.new
    render layout: "application"
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
    impressionist(@pen)
    render layout: "edit"
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

  # 將排序及搜尋功能放在一個方法中
  def search_user_pen(page)
    case
    when params[:search_term].present? && params[:sort_by].present? && params[:sort_order].present?
      @pens = current_pens.search(params[:search_term]).sort_by_asc(params[:sort_by]).includes_comments_and_page(page)

    when params[:search_term].present? && params[:sort_by].present?
      @pens = current_pens.search(params[:search_term]).sort_by_desc(params[:sort_by]).includes_comments_and_page(page)

    when params[:search_term].present? && params[:sort_order].present?
      @pens = current_pens.search(params[:search_term]).order(created_at: :asc).includes(:comments).includes_comments_and_page(page)

    when params[:sort_by].present? && params[:sort_order].present?
      @pens = current_pens.sort_by_asc(params[:sort_by]).includes_comments_and_page(page)

    when params[:search_term].present?
      @pens = current_pens.search(params[:search_term]).order(created_at: :desc).includes_comments_and_page(page)

    when params[:sort_by].present?
      @pens = current_pens.sort_by_desc(params[:sort_by]).includes_comments_and_page(page)

    when params[:sort_order].present?
      @pens = current_pens.order(created_at: :asc).includes_comments_and_page(page)

    else
      @pens = current_pens.order(created_at: :desc).includes_comments_and_page(page)
    end
  end

  def current_pens
    current_user.pens
  end

  def find_user_pen
    begin
      @pen = Pen.find_by!(random_url: params[:random_url])
    rescue
      redirect_to pens_path
    end
  end
end