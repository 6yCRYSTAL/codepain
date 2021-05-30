class Pin < ApplicationRecord
  belongs_to :pen
  belongs_to :user
end
