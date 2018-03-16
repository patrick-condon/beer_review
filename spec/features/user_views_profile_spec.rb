require 'rails_helper'

feature 'user checks his profile page', %(
  As a signed up user
  I want to view my profile page
  So that I can see my account information) do
  scenario 'view account information' do
  user = FactoryBot.create(:user)

   visit user_path(user)

   expect(page).to have_content(user.username)
   expect(page).to have_content(user.email)
   expect(page).to have_content(user.profile_photo)
  end
end
