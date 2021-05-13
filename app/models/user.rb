class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: [:github, :google_oauth2]


  def self.from_omniauth_google(auth)
    data = auth.info
    user = User.where(email: data['email']).first
    # Uncomment the section below if you want users to be created if they don't exist
    unless user
        user = User.new(
          username: data['name'],
          email: data['email'],
          password: Devise.friendly_token[0,20],
          display_name: data['name']
        )
        user.save
    end
    user
  end

  # def self.from_omniauth_github(auth)
  #   puts auth
  #   user = User.find_or_create_by(provider: auth['provider'], uid: auth['uid'])

  #   user.username = auth['info']['name']
  #   user['display_name'] = auth['info']['nickname']
  #   user.email = auth['info']['email']
  #   user.password = Devise.friendly_token[0,20]
  #   # user.image_url = auth['info']['image']
  #   # user.token = auth['credentials']['token']

  #   user.save
  #   user
  # end
  def self.from_omniauth_github(auth)
    puts auth
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.username = auth.info.name   # assuming the user model has a name
      user.display_name = auth.info.name
      # user.save
      # user.image = auth.info.image  / assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails, 
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end


  # def self.create_from_provider_data(provider_data)
  #   where(provider: provider_data.provider, uid: provider_data.uid).first_or_create do |user|
  #     user.email = provider_data.info.email
  #     user.password = Divise.friendly_token[0, 20]
  #   end
  # end
end
