# Model for beer table
class Beer < ApplicationRecord
  validates_presence_of :beer_name, :brewery_name, :beer_style, :beer_abv
  validates :beer_name, case_sensitive: false

  has_many :reviews
end
