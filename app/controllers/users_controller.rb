# This is the controller for the user object
class UsersController < ApplicationController
  def index
    @users = User.all
  end
end