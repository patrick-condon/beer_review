class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.integer :beer_id, null: false
      t.text :body, null: false
      t.float :rating, null: false
      t.integer :vote_score, null: false

      t.timestamps
    end
  end
end
