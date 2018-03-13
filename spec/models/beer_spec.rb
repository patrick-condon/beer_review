require 'spec_helper'

describe Beer do
  describe '.new' do
    it 'takes a name, brewery name, style, and abv' do
      beer = Beer.new(beer_name: 'Miller lite', brewery_name: 'Coors',
        beer_style: 'American Pilsner', beer_abv: 4.2)
      expect(beer).to be_a(Beer)
    end
  end

  let(:beer) { Beer.create(beer_name: 'Miller lite', brewery_name: 'Coors',
    beer_style: 'American Pilsner', beer_abv: 4.2) }

  describe 'Model' do
    it 'has attributes' do
      expect(beer.beer_name).to eq('Miller lite')
      expect(beer.brewery_name).to eq('Coors')
      expect(beer.beer_style).to eq('American Pilsner')
      expect(beer.beer_abv).to eq(4.2)
    end
  end

  let(:beer2) { Beer.create(beer_name: ' ', brewery_name: '', beer_style: '', beer_abv: '') }

  describe 'Errors' do
    it 'create model with no input' do
      expect(beer2).to_not be_valid
    end
  end
end
