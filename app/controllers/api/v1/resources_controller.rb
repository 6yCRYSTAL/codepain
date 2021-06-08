class Api::V1::ResourcesController < Api::ApiController
  respond_to :json
  include Searchable
  before_action :authenticate_user!

  def create
    find_user_pen
    @cdn = @pen.resources.new({pen: @pen,
                               category: params[:category],
                               url: params[:url]})

    if @cdn.save
      render json: @cdn.as_json(include: :pen), status: :created
    else
      render json: { status: 'failed' }, status: :expectation_failed
    end
  end

  def destroy
    cdn = Resource.find_by(id: params[:id])
    if user_signed_in? && current_user == cdn.pen.user
      cdn.destroy
      render json: { status: 'Destroyed' }, status: :ok
    else
      render json: { status: 'Destroy failed' }, status: :expectation_failed
    end
  end
end