# API backend for Beers Index
class ApiController
  class Api
    class V1
      class BeersController
        def index
          render json: { beers: Beer.all }
        end
      end
    end
  end
end
