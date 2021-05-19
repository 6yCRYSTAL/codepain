class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :membership, :string, default: 'free'
    add_index :users, :membership
    add_column :users, :start_pro_at, :datetime
    add_column :users, :expired_pro_at, :datetime
    add_index :users, :expired_pro_at
    add_column :users, :unsubscribed_pro_at, :datetime
  end
end
