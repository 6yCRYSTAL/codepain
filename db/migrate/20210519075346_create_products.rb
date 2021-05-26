class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :plan, null: true
      t.string :desc, null: true
      t.integer :price, null: true
      t.string :period, null: true

      t.timestamps
    end
    add_index :products, :plan
    add_index :products, :period
  end
end