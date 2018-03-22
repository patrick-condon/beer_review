# API backend for Beers Index
class Api::V1::BeersController < ApiController
  before_action :authorize_user, except: %i[index show create]
  before_action :authenticate_user!, except: %i[index show]

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
    if current_user
      new_beer = Beer.create!(beer_params)
      render json: new_beer
    end
  end

  def destroy
    beer = Beer.find(params[:id])
    render json: { beers: Beer.all }
    if beer.destroy
      flash[:notice] = 'Successfully deleted beer.'
    end
  end

  protected

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = 'You do not have access to this page.'
      redirect_to root_path
    end
  end

  def beer_params
    params.require(:beer).permit(
      :beer_name, :brewery_name, :beer_style, :beer_description,
      :beer_abv, :beer_active, :beer_label
    )
  end
end
