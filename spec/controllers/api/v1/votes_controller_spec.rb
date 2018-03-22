require 'rails_helper'

RSpec.describe Api::V1::VotesController, type: :controller do
  let!(:first_beer) do
    Beer.create(
      beer_name: 'Burning River', brewery_name: 'Great Lakes',
      beer_style: 'Pale Ale', beer_abv: 5.8
    )
  end
  let!(:user1) do
    User.create(
      email: 'email@real.net', username: 'real-user', password: 'password'
    )
  end
  let!(:review) do
    Review.create(
      beer_id: first_beer.id, user_id: user1.id, rating: 4,
      body: 'It was a beer', vote_score: 0
    )
  end
  describe 'POST#create' do
    it 'does not allow a user to vote if not signed in' do
      sign_in nil
      post_json = { value: 1, review_id: review.id,
                   beer_id: first_beer.id }
      post(:create, params: { beer_id: first_beer.id, review_id: review.id,
                              vote: post_json })
      expect(response).to redirect_to(new_user_session_path)
    end
  end
end
