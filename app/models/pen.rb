class Pen < ApplicationRecord
  acts_as_paranoid

  before_create :generate_random_url

  # belongs_to :user

  private

  def generate_random_url
    require 'securerandom'
    random_url = SecureRandom.urlsafe_base64
  end

end
