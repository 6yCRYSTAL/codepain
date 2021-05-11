Rails.application.routes.draw do

  # pens
  # resources :pens, only: [:index, :new], path_names: { index: 'your-work', new: 'pen' }
  
  get '/your-work', to: 'pens#index', as: 'pens'
  get '/pen', to: 'pens#new', as: 'new_pen'
  
  scope ':username' do
    resources :pen, controller: 'pens', except: [:index, :new]
  end

  # static pages
  root 'statics#index'
end