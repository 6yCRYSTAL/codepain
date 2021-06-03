module Searchable

  def find_user_pen
    @pen = Pen.find_by!(random_url: params[:random_url])
  end

  def current_pens
    current_user.pens
  end

  # 將排序及搜尋功能放在一個方法中
  def search_user_pen(page, per)
    case
    when params.has_key?(:search_term) && params.has_key?(:sort_by) && params.has_key?(:sort_order)
      @pens = current_pens.search(params[:search_term]).sort_by_asc(params[:sort_by]).includes_comments_and_page(page, per)

    when params.has_key?(:search_term) && params.has_key?(:sort_by)
      @pens = current_pens.search(params[:search_term]).sort_by_desc(params[:sort_by]).includes_comments_and_page(page, per)

    when params.has_key?(:search_term) && params.has_key?(:sort_order)
      @pens = current_pens.search(params[:search_term]).order(created_at: :asc).includes(:comments).includes_comments_and_page(page, per)

    when params.has_key?(:sort_by) && params.has_key?(:sort_order)
      @pens = current_pens.sort_by_asc(params[:sort_by]).includes_comments_and_page(page, per)

    when params.has_key?(:search_term)
      @pens = current_pens.search(params[:search_term]).order(created_at: :desc).includes_comments_and_page(page, per)

    when params.has_key?(:sort_by)
      @pens = current_pens.sort_by_desc(params[:sort_by]).includes_comments_and_page(page, per)

    when params.has_key?(:sort_order)
      @pens = current_pens.order(created_at: :asc).includes_comments_and_page(page, per)

    else
      @pens = current_pens.order(created_at: :desc).includes_comments_and_page(page, per)
    end
  end
end