require 'rails_helper'

feature 'User checks their profile page' do
  let(:user) { FactoryBot.create(:user) }
  let(:user2) { FactoryBot.create(:user) }
  scenario 'view account information' do
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'
    click_on 'Profile'

    expect(page).to have_content(user.username)
    expect(page).to have_content(user.email)
    expect(page).to have_content(user.profile_photo)
  end

  scenario 'user cannot see other profiles' do
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'
    visit user_path(user2)

    expect(page).to have_content('You can only view your profile')
    expect(page).to_not have_content(user.username)
    expect(page).to_not have_content(user.email)
  end

  scenario 'Must be signed in to view profile' do
    visit user_path(user2)

    expect(page).to have_content('Please sign in to view profile')
    expect(page).to_not have_content(user.username)
    expect(page).to_not have_content(user.email)
  end
end
