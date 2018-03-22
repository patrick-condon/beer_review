# API backend for Reviews Index
class Api::V1::ReviewsController < ApiController
  before_action :authorize_user, except: %i[index create]
  before_action :authenticate_user!, except: %i[index]

  def index
    reviews = Review.where(beer_id: params[:beer_id]).order(:created_at).reverse
    users = get_users(reviews)
    user = {}
    prior_votes = []
    if current_user
      user = current_user
      prior_votes = Vote.where('user_id = ? AND beer_id = ?',
                               user.id, params[:beer_id])
    end
    render json: { reviews: reviews, users: users,
                   prior_votes: prior_votes, user: user }
  end

  def destroy
    review = Review.find(params[:id])
    votes = Vote.where(review_id: review.id)
    if review.destroy
      votes.each do |vote|
        vote.destroy
      end
      reviews = Review.where(beer_id: params[:beer_id]).order(:created_at).reverse
      render json: { reviews: reviews }
      flash[:notice] = 'Successfully deleted review.'
    end
  end

  def create
    if current_user
      new_review = Review.create!(review_params)
      user = User.find(new_review.user_id)
      reviews = Review.where(beer_id: params[:review][:beer_id]).order(:created_at).reverse
      users = get_users(reviews)
      prior_votes = Vote.where('user_id = ? AND beer_id = ?',
                               user.id, params[:review][:beer_id])
      render json: { reviews: reviews, users: users,
                     prior_votes: prior_votes, user: user }
    else
      redirect_to new_user_session_path
    end
  end

  protected

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = 'You do not have access to this page.'
      redirect_to root_path
    end
  end

  def review_params
    params.require(:review).permit(
      :rating, :body, :beer_id, :user_id, :vote_score
    )
  end

  def get_users(reviews)
    reviews = reviews
    users = []
    reviews.each do |review|
      unless users.include?(review.user)
        users << review.user
      end
    end
    return users
  end
end
