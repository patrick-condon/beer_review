# vote model
class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :review

  validates_presence_of :user_id, :review_id, :beer_id
  validates :value, inclusion: { in: [-1, 0, 1] }
end
