class Pen < ApplicationRecord
  acts_as_paranoid
  is_impressionable counter_cache: true, column_name: :edit_view_count, unique: :session_hash

  validates :random_url, uniqueness: true
  before_create :generate_random_url

  belongs_to :user
  has_many :comments

  scope :is_soft_deleting, -> { only_deleted.where(state: 'soft_deleting') }
  scope :deleted_in_1_hour, -> { is_soft_deleting.where('deleted_at > ?', 1.hour.ago) }
  scope :find_pen_by_search_keyword, -> search_params { where('title Ilike ?', "%#{search_params}%") }

  def generate_random_url
    require 'securerandom'
    new_random_url = SecureRandom.urlsafe_base64(6)
    # 對Pen做判斷式看看是否已經存在random_url
    while Pen.exists?(random_url: new_random_url)
      new_random_url = SecureRandom.urlsafe_base64(6)
    end

    self.random_url = new_random_url
  end

  def to_param
    random_url
  end
end
