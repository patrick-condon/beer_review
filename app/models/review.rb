# Model for review table
class Review < ApplicationRecord
  validates_presence_of :beer_id, :body, :rating, :vote_score

  belongs_to :beer
end
