require 'rails_helper'

feature 'user updates information' do
  scenario 'authenticated user edits information' do
    user = FactoryBot.create(:user)

    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')

    click_on 'Edit'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    fill_in 'Current password', with: user.password
    click_on 'Update'

    expect(page).to have_content('Your account has been updated successfully')
  end

  scenario 'edited information persisted' do
    user = FactoryBot.create(:user)

    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')

    click_on 'Edit'
    fill_in 'Password', with: 'newpassword'
    fill_in 'Password confirmation', with: 'newpassword'
    fill_in 'Current password', with: user.password
    click_on 'Update'

    expect(page).to have_content('Your account has been updated successfully')

    click_link 'Sign Out'

    expect(page).to have_content('Signed out successfully')

    click_on 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_content('Invalid Email or password')
  end

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
