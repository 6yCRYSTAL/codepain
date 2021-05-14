class AddUsernameToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :username, :string, uniqueness: true, null: false
    add_column :users, :bio, :string, default: ''
    add_column :users, :display_name, :string, uniqueness: true, null: false

    add_index :users, :username
  end
end
