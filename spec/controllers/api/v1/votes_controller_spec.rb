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
    it 'posts a vote' do
      sign_in
      post_json = { value: 1, review_id: review.id,
                    beer_id: first_beer.id, user_id: user1.id }
      prev_count = Vote.count
      post(:create, params: { beer_id: first_beer.id, review_id: review.id,
                              vote: post_json })
      expect(Vote.count).to eq(prev_count + 1)
    end
  end
  it 'returns the json of the newly posted vote and review' do
    sign_in
    post_json = { value: 1, review_id: review.id,
                  beer_id: first_beer.id, user_id: user1.id }
    post(:create, params: { beer_id: first_beer.id, review_id: review.id,
                            vote: post_json })
    returned_json = JSON.parse(response.body)
    expect(response.status).to eq 200
    expect(response.content_type).to eq('application/json')
    expect(returned_json).to be_kind_of(Hash)
    expect(returned_json['reviews'][0]['beer_id']).to eq first_beer.id
    expect(returned_json['reviews'][0]['vote_score']).to eq 1
  end
end
