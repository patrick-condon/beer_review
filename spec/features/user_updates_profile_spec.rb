require 'rails_helper'

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
