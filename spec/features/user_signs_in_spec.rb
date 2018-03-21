require 'rails_helper'

feature 'user signs in' do
  scenario 'specify valid credentials' do
    user = FactoryBot.create(:user)

    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'
    
    expect(page).to have_content('Signed in successfully')
    expect(page).to have_content('Sign Out')
  end

  scenario 'specify invalid credentials' do
    visit new_user_session_path
    click_button 'Log in'

    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'specify valid credentials with admin role' do
    admin = User.create!(email: 'admin@admin.com', username: 'Waylon_Smithers',
                         profile_photo: nil, role: 'admin',
                         password: 'password')

    visit new_user_session_path
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_content('Sign Out')
    expect(page).to have_content('Admin Section')
  end
end
