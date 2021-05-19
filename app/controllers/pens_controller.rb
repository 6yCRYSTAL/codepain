class PensController < ApplicationController
  layout 'edit',only: [:new, :edit]
  layout 'show',only: [:show]
  before_action :authenticate_user!
  # impressionist :actions=>[:edit]

  def index
    # pens tab / all or search
    @pens = search_pen(clear_search_params)
    p @pens

    # deleted tab
    @deleted_pens = current_user.pens.deleted_in_1_hour
    
    # for Comment
    # @comments = current_pen.comments.all.order(id: :desc)
    # @comments_counts = @comments.count
    @comment = current_user.comments.new

  end
  
  def new
    @pen = Pen.new
  end

  def show
    current_pen
    @comments = current_pen.comments.all.order(id: :desc)
    @comments_counts = @comments.count
    @comment = current_user.comments.new

    respond_to do |format|
      format.js
      format.html
    end
  end

  def edit
    current_pen
    puts @pen.id
    impressionist(@pen)
  end

  def destroy
    current_pen
    # change pen state
    @pen.update(state: 'soft_deleting')
    # soft_delete the pen
    @pen.destroy
    redirect_to pens_path, notice: "DELETED!!!"
  end

  private
  def clear_search_params
    params.permit(:search)
  end

  def search_pen(search_params)
    # 如果沒搜尋 那就給他user所有的pens
    return current_user.pens if search_params[:search].nil?
    # 有搜尋的話就去db撈資料
      current_user.pens.find_pen_by_search_keyword(search_params[:search])
  end

  def current_pen
    @pen = current_user.pens.find_by(random_url: params[:random_url])
    # Need confirm! 
    # redirect_to pens_path if @pen.nil? #
    if @pen
      return @pen
    else
      redirect_to pens_path
    end
  end

end
