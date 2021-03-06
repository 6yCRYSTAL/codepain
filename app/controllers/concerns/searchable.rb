module Searchable

  def find_user_pen
    @pen = Pen.find_by!(random_url: params[:random_url])
  end

  # 將排序及搜尋功能放在一個方法中
  def search_user_pen(page, per)
    pens = current_user.pens
    case
    when params.has_key?(:search_term) && params.has_key?(:sort_by) && (params[:sort_order] == 'asc')
      @pens = pens.search(params[:search_term])
                  .sort_asc(params[:sort_by])
                  .includes(:comments)
                  .page(page).per(per)

    when params.has_key?(:search_term) && params.has_key?(:sort_by)
      @pens = pens.search(params[:search_term])
                  .sort_desc(params[:sort_by])
                  .includes(:comments)
                  .page(page).per(per)

    when params.has_key?(:search_term) && (params[:sort_order] == 'asc')
      @pens = pens.search(params[:search_term])
                  .order(created_at: :asc)
                  .includes(:comments)
                  .page(page).per(per)

    when params.has_key?(:sort_by) && (params[:sort_order] == 'asc')
      @pens = pens.sort_asc(params[:sort_by])
                  .includes(:comments)
                  .page(page).per(per)

    when params.has_key?(:search_term)
      @pens = pens.search(params[:search_term])
                  .order(created_at: :desc)
                  .includes(:comments)
                  .page(page).per(per)

    when params.has_key?(:sort_by)
      @pens = pens.sort_desc(params[:sort_by])
                  .includes(:comments)
                  .page(page).per(per)

    when (params[:sort_order] == 'asc')
      @pens = pens.order(created_at: :asc)
                  .includes(:comments)
                  .page(page).per(per)

    else
      @pens = pens.order(created_at: :desc)
                  .includes(:comments)
                  .page(page).per(per)
    end
  end
end