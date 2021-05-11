Rails.application.routes.draw do
  # users
  devise_for :users

  # pens
  get '/your-work', to: 'pens#index', as: 'pens'
  get '/pen', to: 'pens#new', as: 'new_pen'
  
  # wait for devise user
  scope 'username' do
    resources :pen, controller: 'pens', except: [:index, :new], param: :random_url
  end

  # static pages
  root 'statics#index'
end
