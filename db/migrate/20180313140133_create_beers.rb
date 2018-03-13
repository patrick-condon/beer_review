class CreateBeers < ActiveRecord::Migration[5.1]
  def change
    create_table :beers do |t|
      t.string :beer_name, null:false
      t.string :brewery_name, null: false
      t.string :beer_style, null: false
      t.float :beer_abv, null: false
      t.string :beer_description
      t.integer :beer_active
      t.string :beer_label

      t.timestamps
    end
  end
end
