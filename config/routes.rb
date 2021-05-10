Rails.application.routes.draw do

  # pens
  scope ':username' do
    resources :pens, except: [:index]
  end
  get '/your-work', to: 'pens#index'

  # static pages
  root 'statics#index'
end