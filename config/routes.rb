Rails.application.routes.draw do
  root 'beers#index'
  devise_for :users

  resources :users, only: [:index, :show]
  resources :beers, only: [:index, :show]

  get 'add_new_beer', to: 'beers#new'

  namespace :api do
    namespace :v1 do
      resources :beers, only: [:index, :show, :create]
    end
  end
end
