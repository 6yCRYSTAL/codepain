class AddEditViewCountToPen < ActiveRecord::Migration[6.1]
  def change
    add_column :pens, :edit_view_count, :int, default: 0
  end
end
