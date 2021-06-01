class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def not_found
    redirect_to root_path
  end

  def find_user_pen
    @pen = Pen.find_by!(random_url: params[:random_url])
  end

  def current_pens
    current_user.pens
  end

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
end
