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
      success!(PenBlueprint.render_as_hash(pen, view: :normal))
    else
      fail!(pen.errors.full_messages, 'update failed')
    end
  end

  def love_list
    pen = Pen.find_by(random_url: love_params[:random_url])

    if current_user.loved?(pen)
      current_user.love_pens.destroy(pen)
      success!(PenBlueprint.render_as_hash(current_user.love_pens, view: :normal), 'removed')
    else
      current_user.love_pens << pen
      success!(PenBlueprint.render_as_hash(current_user.love_pens, view: :normal), 'added')
    end
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
