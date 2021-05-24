class Api::ApiController < ApplicationController

  def success_render!(data, view, code = :ok)
    render json: {
      success: true,
      payload: PenBlueprint.render_as_hash(data, view: view),
      status: code
    }
  end

  def success_meta_render!(data, view, root, meta, code = :ok) # 有需要給meta再用這個方法
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

  def fail_render!(errors, code = :unprocessable_entity)
    render json: {
      success: false,
      errors: errors,
      status: code
    }
  end
end