Rails.application.routes.draw do
  devise_for :users, path: 'accounts', controllers: { omniauth_callbacks: 'users/omniauth_callbacks', confirmations: 'users/confirmations', passwords: 'users/passwords', registrations: 'users/registrations', unlocks: 'users/unlocks', sessions: 'users/sessions' }

  devise_scope :user do
    get 'login', to: 'users/sessions#new'
    delete 'logout', to: 'users/sessions#destroy'
  end

  # pens
  get '/your-work', to: 'pens#index', as: 'pens'
  get '/pen', to: 'pens#new', as: 'new_pen'
  get '/:username/details/:random_url', to: 'pens#show', as: 'pen'
  get '/:username/pen/:random_url', to: 'pens#edit', as: 'edit_pen'
  delete '/:username/pen/:random_url', to: 'pens#destroy', as: 'destroy_pen'

  # static pages
  root 'statics#index'

  # api
  namespace :api, default: { format: :json } do
    namespace :v1 do
      resources :pens, only: [:index, :create, :update, :destroy]
    end
  end
end
