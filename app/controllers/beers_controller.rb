# Ruby Controller for Beer Model
class BeersController < ApplicationController
  def index
    @beers = Beer.all
    @users = User.all
  end

  def show
    @beer = Beer.find(params[:id])
  end
end
