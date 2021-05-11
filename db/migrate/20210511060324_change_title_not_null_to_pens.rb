class ChangeTitleNotNullToPens < ActiveRecord::Migration[6.1]
  def change
    change_column_null :pens, :title, false
  end
end
