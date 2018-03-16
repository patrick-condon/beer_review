require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do
  let!(:first_beer) do
    Beer.create(
      beer_name: 'Burning River', brewery_name: 'Great Lakes',
      beer_style: 'Pale Ale', beer_abv: 5.8
    )
  end
  let!(:user) { FactoryBot.create(:user) }
  let!(:review) do
    Review.create(
      beer_id: first_beer.id, user_id: 1, rating: '4',
      body: 'It was a beer'
    )
  end
    let!(:review2) do
      Review.create(
        beer_id: first_beer.id, user_id: 1, rating: '3',
        body: 'It was a good beer'
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
      expect(returned_json['users'][0]).to eq user.username
      expect(returned_json['reviews'][0]['rating']).to eq '4'
      expect(returned_json['reviews'][0]['body']).to eq 'It was a beer'
      expect(returned_json['reviews'][1]['raitng']).to eq '3'
      expect(returned_json['reviews'][1]['body']).to eq 'It was a good beer'
    end
  end
end
