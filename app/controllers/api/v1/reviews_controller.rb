# API backend for Reviews Index
class Api::V1::ReviewsController < ApiController
  before_action :authenticate_user!
  def index
    reviews = Review.where(beer_id: params[:beer_id])
    users = []
    reviews.each do |review|
      unless users.include?(review.user)
        users << review.user
      end
    end
    render json: { reviews: reviews, users: users }
  end

  def create
    data = JSON.parse(request.body.read)
    new_review = Review.create!(
      beer_id: data['beer_id'], user_id: data['user_id'],
      rating: data['rating'], body: data['body'], vote_score: data['vote_score']
    )
    user = User.find(data['user_id'])
    render json: { review: new_review, user: user }
  end
end
