class Api::V1::PensController < Api::ApiController
  respond_to :json

  before_action :authenticate_user!, except: [:new]
  before_action :find_user_pen, only: [:edit, :update]

  def index
    @pens = current_user.pens.order(updated_at: :desc)
    success_render!(@pens, :extended)
  end

  def create
    @pen = current_user.pens.new(pen_params)

    if @pen.save
      redirect_to edit_pen_path(@pen, username: current_user.username)
    else
      redirect_to pens_path
    end
  end

  def edit
    success_render!(@pen, :normal)
  end

  def update
    if @pen.update(pen_params)
      success_render!(@pen, :normal, 'update succeeded')
    else
      fail_render!(@pen.errors.full_messages, 'update failed')
    end
  end

  def love_list
    pen = Pen.find_by(random_url: love_params[:random_url])

    if current_user.loved?(pen)
      current_user.love_pens.destroy(pen)
      success!({ boolean: love_pen? }, 'removed')
    else
      current_user.love_pens << pen
      success!({ boolean: love_pen? }, 'added')
    end
  end

  def pin_list
    pin_list = current_user.pinned_pens.select(:title, :updated_at, :id, :user_id).reverse
    # order by pin 的 created_at 這部分還需測試
    user_list = User.joins(pens: :pinners).where(pins: { user_id: current_user.id }).select(:username, :display_name)
    success!({ pinned_pens: pin_list, user_list: user_list})
  end

  def pin_create
    pen = Pen.find_by(random_url: params.permit(:random_url)[:random_url])
    if current_user.pinned?(pen)
      current_user.pinned_pens.destroy(pen)
      success!({ boolean: pin_pen?(pen) }, 'removed')
    else
      current_user.pinned_pens << pen
      success!({ boolean: pin_pen?(pen) }, 'added')
    end
  end

  def grid
    pens_per_page(params[:page], 6)

    success_meta_render!(@pens, :extended, :pens, {totalPages: @pens.total_pages,
                                                  totalCount: @pens.total_count,
                                                  currentPage: @pens.current_page,
                                                  lastPage: @pens.last_page?,
                                                  nextPage: @pens.next_page,
                                                  prevPage: @pens.prev_page})
  end

  def list
    pens_per_page(params[:page], 20)

    success_meta_render!(@pens, :extended, :pens, {totalPages: @pens.total_pages,
                                                  totalCount: @pens.total_count,
                                                  currentPage: @pens.current_page,
                                                  lastPage: @pens.last_page?,
                                                  nextPage: @pens.next_page,
                                                  prevPage: @pens.prev_page})
  end

  private

  def pens_per_page(page, per)
    @pens = current_user.pens.order(updated_at: :desc).page(page = 1).per(per)
  end

  def love_pen?
    HeartList.where('pen_id = ? AND user_id = ?', pen.id, current_user.id).exists?
  end

  def pin_pen?(pen)
    Pin.where('pen_id = ? AND user_id = ?', pen.id, current_user.id).exists?
  end

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
      @pen = current_user.pens.find_by(random_url: params[:random_url])
    rescue
      redirect_to pens_path
    end
  end
end