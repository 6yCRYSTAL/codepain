class Api::V1::PensController < Api::ApiController
  respond_to :json

  before_action :authenticate_user!, except: [:new]
  before_action :find_user_pen, only: [:edit, :update]

  def index
    pens = current_user.pens.order(updated_at: :desc)

    success!(PenBlueprint.render_as_hash(pens, view: :extended))
  end

  def create
    pen = current_user.pens.new(pen_params)

    if pen.save
      redirect_to edit_pen_path(pen, username: current_user.username)
    else
      redirect_to pens_path
    end
  end

  def edit
    success!(PenBlueprint.render_as_hash(pen, view: :normal))
  end

  def update
    if pen.update(pen_params)
      success!(PenBlueprint.render_as_hash(pen, view: :normal), 'update succeeded')
    else
      fail!(pen.errors.full_messages, 'update failed')
    end
  end

  def love_list
    pen = Pen.find_by(random_url: love_params[:random_url])

    if current_user.loved?(pen)
      current_user.love_pens.destroy(pen)
      love_pen = HeartList.where('pen_id = ? AND user_id = ?', pen.id, current_user.id).exists?
      success!(love_pen, 'removed')
    else
      current_user.love_pens << pen
      love_pen = HeartList.where('pen_id = ? AND user_id = ?', pen.id, current_user.id).exists?
      success!(love_pen, 'added')
    end
  end

  def grid
    pens = current_user.pens.order(updated_at: :desc).page(params[:page] || 1).per(6)

    success!(PenBlueprint.render_as_hash(pens, view: :extended, root: :pens,
                                         meta: {
                                           totalPages: pens.total_pages,
                                           totalCount: pens.total_count,
                                           currentPage: pens.current_page,
                                           lastPage: pens.last_page?,
                                           nextPage: pens.next_page,
                                           prevPage: pens.prev_page
                                         }))
  end

  def list
    pens = current_user.pens.order(updated_at: :desc).page(params[:page] || 1).per(20)

    success!(PenBlueprint.render_as_hash(pens, view: :extended, root: :pens,
                                         meta: {
                                           totalPages: pens.total_pages,
                                           totalCount: pens.total_count,
                                           currentPage: pens.current_page,
                                           lastPage: pens.last_page?,
                                           nextPage: pens.next_page,
                                           prevPage: pens.prev_page
                                         }))
  end

  private

  def love_params
    params.permit(:random_url)
  end

  def pen_params
    clean_params = params.require(:pen).permit(:title, :html, :css, :js)

    if clean_params[:title] == "Untitled"
      clean_params.merge(title: "A Pen by #{current_user.display_name}")
    else
      clean_params
    end
  end

  def find_user_pen
    begin
      pen = current_user.pens.find_by(random_url: params[:random_url])
    rescue
      redirect_to pens_path
    end
  end
end
