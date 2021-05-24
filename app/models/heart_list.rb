class HeartList < ApplicationRecord
  belongs_to :pen, counter_cache: true
  belongs_to :user
end
