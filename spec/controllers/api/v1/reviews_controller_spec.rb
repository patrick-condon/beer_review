require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do
  let!(:first_beer) do
    Beer.create(
      beer_name: 'Burning River', brewery_name: 'Great Lakes',
      beer_style: 'Pale Ale', beer_abv: 5.8
    )
  end
  let!(:user1) do
    User.create( email: 'email@real.net', username: 'real-user', password: 'password')
  end
  let!(:review) do
    Review.create(
      beer_id: first_beer.id, user_id: user1.id, rating: 4,
      body: 'It was a beer', vote_score: 0
    )
  end
  let!(:review2) do
    Review.create(
      beer_id: first_beer.id, user_id: user1.id , rating: 3,
      body: 'It was a good beer', vote_score: 0
    )
  end
  describe 'GET#index' do
    it 'should return a list of reviews' do
      get :index, params: { beer_id: first_beer.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['reviews'].length).to eq 2
      expect(returned_json['users'][0]['username']).to eq user1.username
      expect(returned_json['reviews'][0]['rating']).to eq 4.0
      expect(returned_json['reviews'][0]['body']).to eq 'It was a beer'
      expect(returned_json['reviews'][1]['rating']).to eq 3.0
      expect(returned_json['reviews'][1]['body']).to eq 'It was a good beer'
    end
  end
end
