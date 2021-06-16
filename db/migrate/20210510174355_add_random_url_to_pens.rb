class AddRandomUrlToPens < ActiveRecord::Migration[6.1]
  def change
    add_column :pens, :random_url, :string
    add_index :pens, :random_url, unique: true
  end
end
