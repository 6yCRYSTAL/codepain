class Pen < ApplicationRecord
  include AASM
  acts_as_paranoid

  validates :random_url, uniqueness: true
  before_create :generate_random_url

  belongs_to :user

  scope :deleted_at_1_hour_ago, -> { only_deleted.where('deleted_at < ?', 1.hour.ago) }

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

  # state machine for pen
  aasm column: :state, create_scopes: false do
    state :editing, initial: true
    state :soft_deleted, :really_deleted

    event :soft_delete do
      transtions from: :editing, to: :soft_deleted
    end

    event :restore do
      transtions from: :soft_deleted, to: :editing
    end

    event :really_delete do
      transtions from: :soft_deleted, to: :really_deleted
    end
  end
end
