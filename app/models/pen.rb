class Pen < ApplicationRecord
  acts_as_paranoid

  validates :random_url, uniqueness: true
  before_create :generate_random_url

  belongs_to :user

  def generate_random_url
    require 'securerandom'
    # 對Pen做判斷式看看是否已經存在random_url
      new_random_url = SecureRandom.urlsafe_base64(6)

      while Pen.where(random_url: new_random_url).exists?
        new_random_url = SecureRandom.urlsafe_base64(6)
      end

      self.random_url = new_random_url
  end

  def to_param
    random_url
  end

end
