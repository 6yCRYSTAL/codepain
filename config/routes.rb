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

  # pens
  get '/your-work', to: 'pens#index', as: 'pens'
  get '/pen', to: 'pens#new', as: 'new_pen'
  get '/:username/details/:random_url', to: 'pens#show', as: 'pen'
  get '/:username/pen/:random_url', to: 'pens#edit', as: 'edit_pen'
  delete '/:username/pen/:random_url', to: 'pens#destroy', as: 'destroy_pen'

  # comments
  post '/:username/details/:random_url', to: 'comments#create', as: 'create_comment'
  resources :comments, only: [:destroy]

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
      resources :comments, only: [:update]
    end
  end
end
