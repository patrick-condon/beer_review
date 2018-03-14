require 'rails_helper'

feature 'profile photo' do
  xscenario 'user uploads a profile photo' do
    visit root_path
    click_link 'Sign Up'
    fill_in 'Username', with: 'username'
    fill_in 'Email', with: 'ash@s-mart.com'
    fill_in 'Password', with: 'boomstick!3vilisd3ad'
    fill_in 'Password confirmation', with: 'boomstick!3vilisd3ad'
    attach_file :user_profile_photo,
                "#{Rails.root}/spec/support/images/IMG_3327.jpg"
    click_button 'Sign up'

    expect(page).to have_css("img[src*='IMG_3327.jpg']")
  end
end

feature 'edit profile photo' do
  xscenario 'user changes profile_photo' do
    visit root_path
    click_link 'Sign Up'
    fill_in 'Username', with: 'username'
    fill_in 'Email', with: 'ash@s-mart.com'
    fill_in 'Password', with: 'boomstick!3vilisd3ad'
    fill_in 'Password confirmation', with: 'boomstick!3vilisd3ad'
    attach_file :user_profile_photo,
                "#{Rails.root}/spec/support/images/IMG_3327.jpg"
    click_button 'Sign up'

    expect(page).to have_css("img[src*='IMG_3327.jpg']")

    click_on 'Edit'
    attach_file :user_profile_photo,
                "#{Rails.root}/spec/support/images/exit.png"
    fill_in 'Current password', with: 'boomstick!3vilisd3ad'
    click_on 'Update'

    expect(page).to have_css("img[src*='exit.png']")
  end
end
