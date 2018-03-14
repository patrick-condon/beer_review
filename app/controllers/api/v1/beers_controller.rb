class Api::V1::BeersController < ApiController
  def index
    render json: { beers: Beer.all }
  end
end
