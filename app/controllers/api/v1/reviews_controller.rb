# API backend for Reviews Index
class Api::V1::ReviewsController < ApiController
  def index
    reviews = Review.where(beer_id: params[:beer_id])
    users = []
    reviews.each do |review|
      users << review.user
    end
    render json: { reviews: reviews, users: users }
  end
end
