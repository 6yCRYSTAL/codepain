class Order < ApplicationRecord
  belongs_to :product
  belongs_to :user
  before_create :generate_serial

  private

  def generate_serial
    require 'securerandom'
    new_serial = DateTime.now.to_s(:number)[0..7] + SecureRandom.base36(12).upcase
    # 確認訂單編號是否重複
    while Order.where(serial: new_serial).exists?
      new_serial = DateTime.now.to_s(:number)[0..7] + SecureRandom.base36(12).upcase
    end

    self.serial = new_serial
  end
end