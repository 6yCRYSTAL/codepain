Rails.application.routes.draw do
  devise_for :users, path: 'accounts', controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  devise_scope :user do
    get 'login', to: 'devise/sessions#new'
    delete 'logout', to: 'devise/sessions#destroy'
  end

  # pens
  get '/your-work', to: 'pens#index', as: 'pens'
  get '/pen', to: 'pens#new', as: 'new_pen'
  # get '/:username/details/:random_url', to: 'pens#show', as: 'pen'
  # get '/:username/pen/:random_url', to: 'pens#edit', as: 'edit_pen'
  # delete '/:username/pen/:random_url', to: 'pens#destroy', as: 'destroy_pen'
  # user還不能註冊登入 目前測試路徑
  get '/details/:random_url', to: 'pens#show', as: 'pen'
  get '/pen/:random_url', to: 'pens#edit', as: 'edit_pen'
  delete '/pen/:random_url', to: 'pens#destroy', as: 'destroy_pen'
  
  # static pages
  root 'statics#index'

  # api
  namespace :api, default: { format: :json } do
    namespace :v1 do
      resources :pens, only: [:create]
      resources :deleted_pens, only: [:update, :destroy]
    end
  end
end
