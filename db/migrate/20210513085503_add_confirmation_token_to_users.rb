class AddConfirmationTokenToUsers < ActiveRecord::Migration[6.1]
  def change
    add_index :users, :confirmation_token, unique: true
  end
end
