class ChangeColumn < ActiveRecord::Migration[5.1]
  def up
    change_column(:beers, :beer_description, :text)
  end

  def down
    change_column(:beers, :beer_description, :string)
  end
end
