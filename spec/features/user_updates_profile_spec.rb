require 'rails_helper'

feature 'user updates information' do
  scenario 'authenticated user edits information that persists' do
    user = FactoryBot.create(:user)

    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'
    click_on 'Edit'
    fill_in 'Username', with: 'newusername'
    fill_in 'Password', with: 'newpassword'
    fill_in 'Password confirmation', with: 'newpassword'
    fill_in 'Current password', with: user.password
    click_on 'Update'

    expect(page).to have_content('Your account has been updated successfully')

    click_link 'Sign Out'
    click_on 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_content('Invalid Email or password')
  end
end

feature 'user can delete account' do
  scenario 'user deletes account' do
    user = FactoryBot.create(:user)

    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')

    click_on 'Edit'
    click_on 'Cancel my account'

    expect(page).to have_content('Your account has been successfully cancelled')
  end
end
