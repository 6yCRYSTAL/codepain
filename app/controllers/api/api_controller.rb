class Api::ApiController < ApplicationController

  def success!(payload = {}, code = :ok) # 可overwrite 如果沒給就是 ok
    render json: {
      success: true,
      payload: payload,
      status: code
    }
  end

  def fail!(errors, code = :unprocessable_entity) # 可overwrite 如果沒給就是 unprocessable_entity
    render json: {
      success: false,
      errors: errors,
      status: code
    }
  end
end