Rails.application.routes.draw do
  # static pages
  root 'statics#index'

  # users
  devise_for :users, path: 'accounts', controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    confirmations: 'users/confirmations',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    unlocks: 'users/unlocks',
    sessions: 'users/sessions'
  }

  # customize user routes for matching codepen
  devise_scope :user do
    get 'login', to: 'users/sessions#new'
    post 'login', to: 'users/sessions#create'
    delete 'logout', to: 'users/sessions#destroy'
  end

  # products
  get '/accounts/pro', to: 'products#index', as: 'products'
  get '/accounts/pro/billing/:plan/:period', to: 'products#show', as: 'product'

  # pens
  get '/your-work', to: 'pens#index', as: 'pens'
  get '/pen', to: 'pens#new', as: 'new_pen'
  get '/:username/details/:random_url', to: 'pens#show', as: 'pen'
  get '/:username/pen/:random_url', to: 'pens#edit', as: 'edit_pen'
  delete '/:username/pen/:random_url', to: 'pens#destroy', as: 'destroy_pen'

  # comments
  post '/:username/details/:random_url', to: 'comments#create', as: 'create_comment'
  resources :comments, only: [:destroy]

  # orders
  resources :orders, only: [:new]

  # api
  namespace :api, default: { format: :json } do
    namespace :v1 do
      resources :pens, only: [:index, :create, :edit, :update], param: :random_url do
        member do
          post :love, action: 'love_list'
          post :pin, action: 'pin_create'
          # resources :pins, only: [:index, :create]
        end

        collection do
          get 'grid/:page', action: 'grid'
          get 'list/:page', action: 'list'
          get :pins, action: 'pin_list'
        end
      end
      resources :deleted_pens, only: [:update, :destroy]
      # orders
      resources :orders, only: [:create] do
        collection do
          post :result
          get :client
        end
      end
      # comments
      resources :comments, only: [:create, :update, :destroy]
    end
  end
end