# frozen_string_literal: true

class AddCommentsCountToPen < ActiveRecord::Migration[6.1]
  def change
    add_column :pens, :comments_count, :integer, default: 0
  end
end
