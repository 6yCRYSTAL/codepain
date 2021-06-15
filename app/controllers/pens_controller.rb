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
    @comments = @pen.comments.order(created_at: :desc)
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
    if user_signed_in? && current_user == @pen.user
      @pen.trash!

      redirect_to pens_path
    else
      redirect_to :root
    end
  end

  def search_all_users
    begin
      pens = Pen.search(params[:q])
                .includes(:user)
                .where.not(user: current_user)
                .where.not(private: true)
                .order(updated_at: :desc)

      pens_per_page(pens)

      respond_to do |format|
        format.json { render json: pens_per_page(pens) }
        format.html { render :search_all_users }
      end
    rescue
      pens = Pen.includes(:user)
                .where.not(user: current_user)
                .where.not(private: true)
                .order(updated_at: :desc)

      pens_per_page(pens)

      respond_to do |format|
        format.json { render json: pens_per_page(pens) }
        format.html { render :search_all_users }
      end
    end
  end

  def follow
    pens = Pen.joins(user: {follower_relationships: :following})
              .includes(:user)
              .where(user: current_user.following, private: false)
              .order(updated_at: :desc)
              .distinct

    pens_per_page(pens)

    respond_to do |format|
      format.json { render json: pens_per_page(pens) }
      format.html { render :follow }
    end
  end

  def trending
    most_viewed_pens = Pen.joins(:impressions)
                          .where("impressions.created_at": 1.day.ago..Time.now)
                          .where.not(user: current_user)
                          .where.not(private: true)
                          .group("pens.id")
                          .order("count(pens.id) DESC")

    most_follower_pens = Pen.joins(user: {follower_relationships: :following})
                            .includes(:user)
                            .where.not(user: current_user)
                            .where.not(private: true)
                            .group("pens.id")
                            .order("count(follows.following_id) DESC")

    pens = (most_viewed_pens.first(50) + most_follower_pens.first(50)).uniq

    pens_per_page(pens)

    respond_to do |format|
      format.json { render json: pens_per_page(pens) }
      format.html { render :trending }
    end
  end

  private

  def pens_per_page(pens)
    @pens = Kaminari.paginate_array(pens).page(params[:page]).per(6)
    @pens = Kaminari.paginate_array(pens).page(1).per(6) if @pens.prev_page.nil?
  end
end