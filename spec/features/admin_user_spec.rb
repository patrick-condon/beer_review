require 'rails_helper'

feature 'admin goes to admin section' do
  let(:user) { FactoryBot.create(:user) }
  let(:user2) { FactoryBot.create(:user) }
  scenario 'visit index page' do
    user3 = User.create(email: 'email@email.com', username: 'Wuser3',
                        profile_photo: nil, role: 'member',
                        password: 'password')
    admin = User.create!(email: 'admin@admin.com', username: 'Waylon_Smithers',
                         profile_photo: nil, role: 'admin',
                         password: 'password')

    visit new_user_session_path
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button 'Log in'
    visit users_path

    expect(page).to have_content(admin.username)
    expect(page).to have_content(user3.username)
  end

  scenario 'visit user show page' do
    admin = User.create!(email: 'admin@admin.com', username: 'Waylon_Smithers',
                         profile_photo: nil, role: 'admin',
                         password: 'password')

    visit new_user_session_path
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button 'Log in'
    visit user_path(user)

    expect(page).to have_content(user.username)
    expect(page).to have_css('input[value="Delete User"]')
  end

  scenario 'visit user2 show page' do
    admin = User.create!(email: 'admin@admin.com', username: 'Waylon_Smithers',
                         profile_photo: nil, role: 'admin',
                         password: 'password')

    visit new_user_session_path
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button 'Log in'
    visit user_path(user2)

    expect(page).to have_content(user2.username)
    expect(page).to have_css('input[value="Delete User"]')
  end
end
