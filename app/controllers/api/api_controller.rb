class Api::ApiController < ApplicationController

  def success!(payload = {}, status = nil)
    status ||= :ok # 可overwrite 如果沒給就是 ok

    render json: {
      success: true,
      payload: payload,
      status: status
    }
  end

  def fail!(errors, status = nil)
    status ||= :unprocessable_entity

    render json: {
      success: false,
      errors: errors,
      status: status
    }
  end
end