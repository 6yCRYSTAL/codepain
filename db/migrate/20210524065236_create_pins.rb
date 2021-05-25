class CreatePins < ActiveRecord::Migration[6.1]
  def change
    create_table :pins do |t|
      t.references :pen, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
