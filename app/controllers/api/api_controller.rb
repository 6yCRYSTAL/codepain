class Api::ApiController < ApplicationController

  def success_blueprint!(data, view, code = :ok)
    render json: {
      success: true,
      payload: PenBlueprint.render_as_hash(data, view: view),
      status: code
    }
  end

  def success_meta_blueprint!(data, view, root, meta, code = :ok) # 有需要給meta再用這個方法
    render json: {
      success: true,
      payload: PenBlueprint.render_as_hash(data,
                                           view: view,
                                           root: root,
                                           meta: meta),
      status: code
    }
  end

  def success!(payload = {}, status = :ok)
    render json: {
      success: true,
      payload: payload,
      status: status
    }
  end

  def fail!(errors, code = :unprocessable_entity)
    render json: {
      success: false,
      errors: errors,
      status: code
    }
  end
end