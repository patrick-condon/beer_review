Rails.application.routes.draw do
  root 'beers#index'
  devise_for :users

  resources :users, only: [:index, :show, :delete, :edit]
  resources :beers, only: [:index, :show, :delete, :edit]

  get 'add_new_beer', to: 'beers#new'

  namespace :api do
    namespace :v1 do
      resources :beers, only: [:index, :show, :create, :destroy, :edit] do
        resources :reviews, only: [:index, :destroy, :create]
      end
    end
  end
end
