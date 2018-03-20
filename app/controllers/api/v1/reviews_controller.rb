# API backend for Reviews Index
class Api::V1::ReviewsController < ApiController
    before_action :authorize_user, except: [:index]
  def index
    reviews = Review.where(beer_id: params[:beer_id])
    users = []
    reviews.each do |review|
      users << review.user
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

  protected

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end
end
