# API backend for Reviews Index
class Api::V1::ReviewsController < ApiController
    before_action :authenticate_user!, :authorize_user, except: [:index, :create]
  def index
    reviews = Review.where(beer_id: params[:beer_id])
    users = []
    reviews.each do |review|
      unless users.include?(review.user)
        users << review.user
      end
    end
    user = {}
    if current_user
      user = current_user
    end
    render json: { reviews: reviews, users: users, user: user }
  end

  def destroy
    review = Review.find(params[:id])
    users = []
    if review.destroy
      reviews = Review.where(beer_id: params[:beer_id])
      render json: { reviews: reviews }
      flash[:notice] = "Successfully deleted review."
    end
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

  protected

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end
end
