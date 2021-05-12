class AddStateToPens < ActiveRecord::Migration[6.1]
  def change
    add_column :pens, :state, :string
  end
end
