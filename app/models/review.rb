# Model for review table
class Review < ApplicationRecord
  belongs_to :beer
  belongs_to :user
  has_many :votes

  validates_presence_of :beer_id, :body, :rating, :vote_score, :user_id
  validates :beer, presence: true
  validates :user, presence: true
end
