class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :plan, null: true
      t.string :desc, null: true
      t.integer :price, null: true

      t.timestamps
    end
    add_index :products, :plan
  end
end