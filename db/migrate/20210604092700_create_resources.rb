class CreateResources < ActiveRecord::Migration[6.1]
  def change
    create_table :resources do |t|
      t.string :category
      t.string :url
      t.references :pen, null: false, foreign_key: true

      t.timestamps
    end
  end
end
