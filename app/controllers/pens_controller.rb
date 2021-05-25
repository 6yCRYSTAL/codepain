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
      @pens = search_pen(params[:search]).includes(:comments)

      # deleted tab
      @deleted_pens = current_user.pens.deleted_in_1_hour

      # for Comment
      @comment = current_user.comments.new
    end
    render layout: "application"
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

  def search_pen(keyword)
    # 如果沒搜尋 那就給他user所有的pens
    return current_user.pens if keyword.nil?
    # 有搜尋的話就去db撈資料
    current_user.pens.search(keyword)
  end

  def find_user_pen
    begin
      @pen = Pen.find_by!(random_url: params[:random_url])
    rescue
      redirect_to pens_path
    end
  end
end
