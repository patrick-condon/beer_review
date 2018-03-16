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

5.times do |x|
  Beer.create(
    beer_name: Faker::Beer.name,
    brewery_name: Faker::TwinPeaks.location,
    beer_style: Faker::Beer.style,
    beer_abv: Faker::Beer.alcohol
  )
end
5.times do |x|
  Beer.create(
    beer_name: Faker::Beer.name,
    brewery_name: Faker::TwinPeaks.location,
    beer_style: Faker::Beer.style,
    beer_abv: Faker::Beer.alcohol,
    beer_description: Faker::RickAndMorty.quote,
    beer_label: Faker::Avatar.image,
    beer_active: rand(2)
  )
end
5.times do |x|
  User.create!(
    email: Faker::Internet.email,
    username: Faker::Internet.user_name,
    password: Faker::Internet.password,
    profile_photo: Faker::Avatar.image
  )
end
