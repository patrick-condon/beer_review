Rails.application.routes.draw do
  root 'beers#index'
  devise_for :users

  resources :users, only: [:index, :show, :destroy, :edit]
  resources :beers, only: [:index, :show, :destroy, :edit]

  get 'add_new_beer', to: 'beers#new'

  namespace :api do
    namespace :v1 do
      resources :beers, only: [:index, :show, :create, :destroy, :update] do
        resources :reviews, only: [:index, :destroy, :create] do
          resources :votes, only: [:index, :create]
        end
      end
    end
  end
end
