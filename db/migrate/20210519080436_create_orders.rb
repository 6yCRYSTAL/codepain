class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.belongs_to :product, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.string :payment_method
      t.string :serial, unique: true
      t.datetime :purchased_at
      t.integer :total_amount
      t.string :ecpay_tradeno
      t.integer :ecpay_chargefee
      t.string :ecpay_check_mac_value

      t.timestamps
    end
    add_index :orders, :serial
  end
end