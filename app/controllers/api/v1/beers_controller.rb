# API backend for Beers Index
class Api::V1::BeersController < ApiController
  def index
    render json: { beers: Beer.all }
  end

  def show
    beer = Beer.find(params[:id])
    render json: { beer: beer }
  end
end
