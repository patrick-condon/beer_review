require 'spec_helper'

describe Review do
  describe '.new' do
    it 'takes a review id, body, rating, and vote score' do
      review = Review.new(beer_id: 1, body: 'this is great!', rating: 4,
                          vote_score: 0)
      expect(review).to be_a(Review)
    end
  end

  describe 'Model' do
    review = Review.create(beer_id: 1, body: 'this is great!', rating: 4,
                           vote_score: 0)
    it 'has attributes' do
      expect(review.beer_id).to eq(1)
      expect(review.body).to eq('this is great!')
      expect(review.rating).to eq(4)
      expect(review.vote_score).to eq(0)
    end
  end

  describe 'Errors' do
    review2 = Review.create(beer_id: ' ', body: '', rating: '', vote_score: '')
    it 'create model with no input' do
      expect(review2).to_not be_valid
    end
  end
end
