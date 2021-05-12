Rails.application.routes.draw do
  devise_for :users, path: 'accounts'

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
  # 測試路徑
  get '/details/:random_url', to: 'pens#show', as: 'pen'
  get '/pen/:random_url', to: 'pens#edit', as: 'edit_pen'
  delete '/pen/:random_url', to: 'pens#destroy', as: 'destroy_pen'
  
  
  # 這是以前的先放著 resources :pens, path: '/pen', except: [:index, :new], param: :random_url

  # static pages
  root 'statics#index'

  # api
  namespace :api, default: { format: :json } do
    namespace :v1 do
      resources :pens, only: [:create, :update]
    end
  end
end
