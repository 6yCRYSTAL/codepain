Rails.application.routes.draw do
  scope ':username' do
    resources :pens, except: [:index]
  end

  get '/your-work', to: 'pens#index'
end
