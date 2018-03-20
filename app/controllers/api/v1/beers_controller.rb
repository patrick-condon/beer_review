# API backend for Beers Index
class Api::V1::BeersController < ApiController
  def index
    render json: { beers: Beer.all }
  end

  def show
    beer = Beer.find(params[:id])
    user = {}
    if current_user
      user = current_user
    end
    render json: { beer: beer, user: user }
  end

  def create
    data = JSON.parse(request.body.read)
    new_beer = Beer.create!(
      beer_name: data['beerName'], brewery_name: data['breweryName'],
      beer_style: data['beerStyle'], beer_abv: data['beerAbv'],
      beer_description: data['beerDescription'],
      beer_active: data['beerActive'], beer_label: data['beerLabel']
    )
    render json: new_beer
  end
end
