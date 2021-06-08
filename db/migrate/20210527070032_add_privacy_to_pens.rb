class AddPrivacyToPens < ActiveRecord::Migration[6.1]
  def change
    add_column :pens, :private, :boolean, default: false
  end
end