class CreateVotes < ActiveRecord::Migration[5.1]
  def change
    create_table :votes do |t|
      t.integer :value, null: false
      t.integer :review_id, null: false
      t.integer :user_id, null: false
      t.integer :beer_id, null: false
      t.timestamps
    end
  end
end
