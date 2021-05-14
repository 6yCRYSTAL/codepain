class AddUserRefToPens < ActiveRecord::Migration[6.1]
  def change
    add_reference :pens, :user, null: false, foreign_key: true
  end
end
