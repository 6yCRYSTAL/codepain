class PensController < ApplicationController
  # before_action :authenticate_user!
  layout false
  before_action :find_user_pen, only: [:show, :edit, :destroy]
  # impressionist :actions=>[:edit]

  def index
    # pens tab / all or search
    if !current_user
      redirect_to :root
    else
      @pens = search_pen.includes(:comments)
      puts @pens
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

  private

  # 將排序及搜尋功能放在一個方法中
  def search_pen
    if params.keys.count > 0
      case
      when params[:search_term].present? && params[:sort_by].present? && params[:sort_order].present?
        current_user.pens.search(params[:search_term]).sort_by_asc(params[:sort_by])

      when params[:search_term].present? && params[:sort_by].present?
        current_user.pens.search(params[:search_term]).sort_by_desc(params[:sort_by])

      when params[:search_term].present? && params[:sort_order].present?
        current_user.pens.search(params[:search_term]).order(created_at: :asc)

      when params[:sort_by].present? && params[:sort_order].present?
        current_user.pens.sort_by_asc(params[:sort_by])

      when params[:search_term].present?
        current_user.pens.search(params[:search_term]).order(created_at: :desc)

      when params[:sort_by].present?
        current_user.pens.sort_by_desc(params[:sort_by])

      when params[:sort_order].present?
        current_user.pens.order(created_at: :asc)
      end
    else
      current_user.pens.order(created_at: :desc)
    end
  end

  def find_user_pen
    begin
      @pen = Pen.find_by!(random_url: params[:random_url])
    rescue
      redirect_to pens_path
    end
  end
end