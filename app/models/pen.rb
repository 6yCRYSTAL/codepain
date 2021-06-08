class Pen < ApplicationRecord
  acts_as_paranoid
  is_impressionable counter_cache: true, column_name: :edit_view_count, unique: :session_hash

  validates :random_url, uniqueness: true
  before_create :generate_random_url

  belongs_to :user
  has_many :comments
  has_many :commenters, through: :comments, source: :user
  has_many :heart_list
  has_many :lovers, through: :heart_list, source: :user
  has_many :pins
  has_many :pinners, through: :pins, source: :user
  has_many :resources

  scope :is_trashed, -> { only_deleted.where(state: 'trashed') }
  scope :deleted_in_1_hour, -> { is_trashed.where('deleted_at > ?', 1.hour.ago) }
  scope :search, -> keyword { where('title Ilike ?', "%#{keyword}%") }

  def self.sort_desc(sort)
    case sort
    when 'Date Created'
      order(created_at: :desc)
    when 'Date Updated'
      order(updated_at: :desc)
    when 'Popularity'
      order(edit_view_count: :desc)
    end
  end

  def self.sort_asc(sort)
    case sort
    when 'Date Created'
      order(created_at: :asc)
    when 'Date Updated'
      order(updated_at: :asc)
    when 'Popularity'
      order(edit_view_count: :asc)
    end
  end

  def trash!
    # change pen state
    self.update(state: 'trashed')
    # soft_delete the pen
    self.destroy
  end

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
