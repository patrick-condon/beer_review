# api endpoint for votes
class Api::V1::VotesController < ApiController
  before_action :authenticate_user!

  def index; end

  def create
    if current_user
      user = current_user
      vote = Vote.new(vote_params)
      prior_vote = Vote.where('user_id = ? AND review_id = ?',
                              vote.user_id, vote.review_id)[0]
      if prior_vote
        if prior_vote.value == vote.value
          prior_vote.value = 0
        else
          prior_vote.value = vote.value
        end
        prior_vote.save
        vote = prior_vote
      else
        vote.save
      end
      if vote.persisted?
        votes = Vote.where(review_id: vote.review_id)
        vote.review.vote_score = 0
        votes.each do |v|
          vote.review.vote_score += v.value
        end
        vote.review.save
        reviews = Review.where(beer_id: vote.beer_id).order(:created_at).reverse
        users = get_users(reviews)
        prior_votes = Vote.where('user_id = ? AND beer_id = ?',
                                 vote.user_id, vote.beer_id)
        render json: { reviews: reviews, users: users,
                       prior_votes: prior_votes, user: user }
      end
    end
  end

  private

  def vote_params
    params.require(:vote).permit(
      :value, :review_id, :beer_id, :user_id
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
