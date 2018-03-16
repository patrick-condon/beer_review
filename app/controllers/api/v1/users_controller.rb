# API backend for Users Index
class Api::V1::UsersController < ApiController
  
  def show
    user = User.find(params[:id])
    render json: { user: user }
  end
end
