class PensController < ApplicationController
  include Searchable
  before_action :find_user_pen, only: [:show, :edit, :destroy, :make_private]
  # impressionist :actions=>[:edit]

  def index
    # pens tab / all or search
    unless user_signed_in?
      redirect_to :root
    else
      search_user_pen(params[:page], 20)
      search_user_pen(1, 20) if @pens.current_page > @pens.total_pages

      # deleted tab
      @deleted_pens = current_user.pens.deleted_in_1_hour

      # for Comment
      @comment = current_user.comments.new
    end
  end

  def new
    @pen = Pen.new
    render layout: "editor"
  end

  def show
    @comments = @pen.comments.all.order(id: :desc)
    @comments_count = @pen.comments_count
    @comment = current_user.comments.new

    render layout: "details"
  end

  def edit
    if @pen.private && current_user != @pen.user
      redirect_to pens_path, alert: "This is a private pen. Please contact the owner for more information."
    else
      render layout: "editor"

      impressionist(@pen)
    end
  end

  def destroy
    if current_user && current_user == @pen.user
      @pen.trash!

      redirect_to pens_path
    else
      redirect_to :root
    end
  end

  def search_all_users
    begin
      @pens = Pen.search(params[:q]).includes(:user).page(params[:page]).per(6)
    rescue
      @pens = Pen.includes(:user).page(params[:page]).per(6)
    end
  end

  def follow
    begin
      pens = Pen.joins(user: {follower_relationships: :following})
                .includes(:user)
                .where(user: current_user.following)
                .shuffle
      @pens = Kaminari.paginate_array(pens).page(params[:page]).per(6)
    rescue
      pens = Pen.joins(user: {follower_relationships: :following})
                 .includes(:user)
                 .where.not(user: current_user)
                 .distinct
                 .shuffle
      @pens = Kaminari.paginate_array(pens).page(params[:page]).per(6)
    end
  end
end