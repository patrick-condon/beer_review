Rails.application.routes.draw do
  root 'beers#index'
  devise_for :users

  resources :users, only: [:index, :show]
  resources :beers, only: [:index, :show, :new, :create]

  namespace :api do
    namespace :v1 do
      resources :beers, only: [:index]
    end
  end
end
