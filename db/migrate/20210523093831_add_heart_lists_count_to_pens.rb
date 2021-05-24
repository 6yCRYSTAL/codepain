class AddHeartListsCountToPens < ActiveRecord::Migration[6.1]
  def change
    add_column :pens, :heart_lists_count, :integer, default: 0
  end
end
