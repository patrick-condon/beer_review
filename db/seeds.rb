# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

Beer.delete_all
User.delete_all
Review.delete_all
Vote.delete_all
beers = []
users = []
reviews = []
2.times do |x|
  beers << Beer.create(
    beer_name: Faker::Beer.name,
    brewery_name: Faker::TwinPeaks.location,
    beer_style: Faker::Beer.style,
    beer_abv: Faker::Beer.alcohol
  )
end
8.times do |x|
  beers << Beer.create(
    beer_name: Faker::Beer.name,
    brewery_name: Faker::TwinPeaks.location,
    beer_style: Faker::Beer.style,
    beer_abv: Faker::Beer.alcohol,
    beer_description: Faker::SiliconValley.quote,
    beer_label: Faker::Avatar.image,
    beer_active: rand(2)
  )
end
5.times do |x|
  users << User.create(
    email: Faker::Internet.email,
    username: Faker::Simpsons.character,
    password: Faker::Internet.password
  )
end
20.times do |x|
  reviews << Review.create(
    beer_id: beers[rand(10)].id,
    body: Faker::RickAndMorty.quote,
    rating: rand(5) + 1,
    vote_score: 0,
    user_id: users[rand(5)].id
  )
end
# 25.times do |x|
#   Vote.create(
#     beer_id: beers[rand(10)].id,
#     user_id: users[rand(5)].id,
#     review_id: reviews[rand(20)].id,
#     value: rand(2) -1
#   )
# end
