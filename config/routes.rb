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
  get 'follow', to: 'pens#follow', as: 'follow'
  get 'trending', to: 'pens#trending', as: 'trending'
  get '/pen', to: 'pens#new', as: 'new_pen'
  get '/:username/details/:random_url', to: 'pens#show', as: 'pen'
  get '/:username/pen/:random_url', to: 'pens#edit', as: 'edit_pen'
  get '/search/pens',  to: 'pens#search_all_users', as: 'search_all_users_pens'
  delete '/:username/pen/:random_url', to: 'pens#destroy', as: 'destroy_pen'

  # comments
  post '/:username/details/:random_url', to: 'comments#create', as: 'create_comment'
  resources :comments, only: [:destroy]

  # orders
  resources :orders, only: [:new]

  # api
  namespace :api, default: { format: :json } do
    namespace :v1 do
      resources :pens, only: [:create, :edit, :update], param: :random_url do
        member do
          get :love, action: 'love_pen'
          post :love, action: 'love_list'
          post :pin, action: 'pin_create'
          post :private, action: 'private_toggle'
          # resources :pins, only: [:index, :create]
        end

        collection do
          get 'grid/:page', action: 'grid'
          get 'search/grid/:page', action: 'grid_search'
          get :pins, action: 'pin_list'
        end
      end
      resources :deleted_pens, only: [:update, :destroy], param: :random_url

      # users
      resource :user, only: [] do
        collection do
          get 'follow', to: 'follows#list'
          post 'follow', to: 'follows#follow'
          post 'unfollow', to: 'follows#unfollow'
        end
      end

      # orders
      resources :orders, only: [:create] do
        collection do
          post :result
          get :client
        end
      end
      # comments
      resources :comments, only: [:index, :create, :update, :destroy]
      # cdn_resources
      resources :resources, only: [:create, :destroy]
    end
  end
end