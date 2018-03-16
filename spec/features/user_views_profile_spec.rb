require 'rails_helper'

feature 'user checks their profile page', %(
  As a signed up user
  I want to view my profile page
  So that I can see my account information) do
    let (:user) { FactoryBot.create(:user) }
  scenario 'view account information' do

    visit user_path(user)

    expect(page).to have_content(user.username)
    expect(page).to have_content(user.email)
    expect(page).to have_content(user.profile_photo)
  end
end
