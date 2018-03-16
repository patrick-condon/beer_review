require 'rails_helper'

RSpec.describe Api::V1::BeersController, type: :controller do
  let!(:first_beer) do
    Beer.create(
      beer_name: 'Burning River', brewery_name: 'Great Lakes',
      beer_style: 'Pale Ale', beer_abv: 5.8
    )
  end
  let!(:second_beer) do
    Beer.create(
      beer_name: '60 Minute Ale', brewery_name: 'Dogfish',
      beer_style: 'IPA', beer_abv: 6.0
    )
  end
  describe 'GET#index' do
    it 'should return a list of beers' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['beers'].length).to eq 2
      expect(returned_json['beers'][0]['beer_name']).to eq 'Burning River'
      expect(returned_json['beers'][0]['brewery_name']).to eq 'Great Lakes'
      expect(returned_json['beers'][1]['beer_style']).to eq 'IPA'
      expect(returned_json['beers'][1]['beer_abv']).to eq 6.0
    end
  end
end
RSpec.describe Api::V1::BeersController, type: :controller do
  let!(:first_beer) do
    Beer.create(
      beer_name: 'Burning River', brewery_name: 'Great Lakes',
      beer_style: 'Pale Ale', beer_abv: 5.8
    )
  end
  describe 'GET#show' do
    it 'should show a beer detail page' do
      get :show, params: { id: first_beer.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['beer']['beer_name']).to eq 'Burning River'
      expect(returned_json['beer']['brewery_name']).to eq 'Great Lakes'
      expect(returned_json['beer']['beer_style']).to eq 'Pale Ale'
      expect(returned_json['beer']['beer_abv']).to eq 5.8
    end
  end
end
RSpec.describe Api::V1::BeersController, type: :controller do
  describe 'POST#create' do
    it 'creates a new Beer' do
      post_json = { beerName: 'Burning River', breweryName: 'Great Lakes',
                    beerStyle: 'Pale Ale', beerAbv: 5.8 }.to_json
      prev_count = Beer.count
      post(:create, body: post_json)
      expect(Beer.count).to eq(prev_count + 1)
    end
    it 'returns the json of the newly posted beer' do
      post_json = { beerName: 'Burning River', breweryName: 'Great Lakes',
                    beerStyle: 'Pale Ale', beerAbv: 5.8 }.to_json
      post(:create, body: post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json['beer_name']).to eq 'Burning River'
      expect(returned_json['brewery_name']).to eq 'Great Lakes'
      expect(returned_json['beer_style']).to eq 'Pale Ale'
      expect(returned_json['beer_abv']).to eq 5.8
    end
  end
end