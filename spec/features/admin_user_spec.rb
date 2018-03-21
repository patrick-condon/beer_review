require 'rails_helper'

feature 'admin goes to admin section' do
  let(:user) { FactoryBot.create(:user) }
  let(:user2) { FactoryBot.create(:user) }
  scenario 'visit index page' do
    admin = User.create!(email: "admin@admin.com", username: "Waylon_Smithers",
                         profile_photo: nil, role: "admin", password: "password")

    visit new_user_session_path
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button 'Log in'
    visit users_path
    # binding.pry
# save_and_open_page
    expect(page).to have_content(admin.username)
    expect(page).to have_content(user.username)
  end

  scenario 'visit user show page' do
    admin = User.create!(email: "admin@admin.com", username: "Waylon_Smithers",
                         profile_photo: nil, role: "admin", password: "password")

    visit new_user_session_path
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button 'Log in'
    visit user_path(user)

    expect(page).to have_content(user.username)
    expect(page).to have_css('input[value="Delete User"]')
  end

  scenario 'visit user2 show page' do
    admin = User.create!(email: "admin@admin.com", username: "Waylon_Smithers",
                         profile_photo: nil, role: "admin", password: "password")

    visit new_user_session_path
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_button 'Log in'
    visit user_path(user2)

    expect(page).to have_content(user2.username)
    expect(page).to have_css('input[value="Delete User"]')
  end
end
