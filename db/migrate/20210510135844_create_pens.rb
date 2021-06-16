class CreatePens < ActiveRecord::Migration[6.1]
  def change
    create_table :pens do |t|
      t.string :title, default: 'Untitled'
      t.text :html, default: ''
      t.text :css, default: ''
      t.text :js, default: ''
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :pens, :title
    add_index :pens, :deleted_at
  end
end
