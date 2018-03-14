class AddUsername < ActiveRecord::Migration[5.1]
  def up
    add_column :users, :username, :string, null: false
    add_index :users, :username, unique: true
  end

  def down
    remove_column :users, :username, :string
  end
end
