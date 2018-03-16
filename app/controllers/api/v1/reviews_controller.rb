# API backend for Reviews Index
class Api::V1::ReviewsController < ApiController
  def index
    reviews = Review.where(beer_id: params[:beer_id])
    users = []
    reviews.each do |review|
      users << review.user
    end
    respond_to do |format|
      format.json  { render json: {reviews: reviews, users: users} }
    end
  end
end
