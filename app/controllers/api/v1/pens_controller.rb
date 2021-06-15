class Api::V1::PensController < Api::ApiController
  respond_to :json
  include Searchable
  before_action :authenticate_user!, except: [:new, :edit]
  before_action :find_user_pen, only: [:private_toggle]

  def create
    @pen = current_user.pens.new(pen_params)
      (JSON.parse(params[:resource][:css]) || []).each do |cssCDN|
        @pen.resources.build(url: cssCDN["url"], category: "css")
      end
      (JSON.parse(params[:resource][:js]) || []).each do |jsCDN|
        @pen.resources.build(url: jsCDN["url"], category: "js")
      end
    if @pen.save
      redirect_to edit_pen_path(@pen, username: current_user.username)
    else
      redirect_to pens_path
    end
  end

  def edit
    begin
      user = User.find_by!(username: params[:username])
      @pen = user.pens.find_by!(random_url: params[:random_url])
      success_blueprint!(@pen, :normal)
    rescue ActiveRecord::RecordNotFound
      fail!( { user: nil }, 'user not found')
    end
  end

  def update
    begin
      user = User.find_by!(username: params[:user][:username])
      @pen = user.pens.find_by!(random_url: params[:random_url])
      if @pen.update(pen_params)
        success_blueprint!(@pen, :normal, 'update succeeded')
      else
        fail!(@pen.errors.full_messages, 'update failed')
      end
    rescue ActiveRecord::RecordNotFound
      fail!( { user: nil }, 'user not found')
    end
  end

  def private_toggle
    unless current_user.membership == 'free'
      @pen.toggle!(:private)
      success!({ boolean: @pen.private }, 'done')
    else
      fail!('Pro members only!', 'Update to pro member first!')
    end
  end

  def love_pen
    @pen = Pen.find_by!(random_url: love_params[:random_url])

    success!({ boolean: love_pen?(@pen), count: @pen.lovers.size }) if current_user
  end

  def love_list
    @pen = Pen.find_by!(random_url: love_params[:random_url])

    if current_user.loved?(@pen)
      current_user.love_pens.destroy(@pen)
      success!({ boolean: love_pen?(@pen) }, 'removed')
    else
      current_user.love_pens << @pen
      success!({ boolean: love_pen?(@pen) }, 'added')
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
    search_user_pen(params[:page], 6)
    search_user_pen(1, 6) if @pens.current_page > @pens.total_pages

    success_meta_blueprint!(@pens, :extended, :pens, {totalPages: @pens.total_pages,
                                                      totalCount: @pens.total_count,
                                                      currentPage: @pens.current_page,
                                                      lastPage: @pens.last_page?,
                                                      nextPage: @pens.next_page,
                                                      prevPage: @pens.prev_page})
  end

  private

  def love_pen?(pen)
    HeartList.exists?(pen: pen, user: current_user)
  end

  def pin_pen?(pen)
    Pin.exists?(pen: pen, user: current_user)
  end

  def love_params
    params.permit(:random_url)
  end

  def pen_params
    clean_params = params.require(:pen).permit(:title, :html, :css, :js, :private)
    if clean_params[:title] == "Untitled"
      clean_params.merge(title: "A Pen by #{current_user.display_name}")
    else
      clean_params
    end
  end
end