# This is the controller for the user object
class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    if current_user
      if current_user.id == @user.id
        assign_profile_picture
      else
        flash[:alert] = 'You can only view your profile'
        redirect_to '/'
      end
    else
      flash[:alert] = 'Please sign in to view profile'
      redirect_to new_user_session_path
    end
  end

  private

  def assign_profile_picture
    if @user.profile_photo.model.profile_photo_url.nil?
      @profile_photo =
        'https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg'
    else
      @profile_photo = @user.profile_photo
    end
  end
end
