class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: [:google, :github, :facebook]
  
  has_many :pens, dependent: :destroy
  has_many :comments

  def self.from_omniauth_provider(auth)
    data = auth.info
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = data.email
      user.password = "password"
      # user.password = Devise.friendly_token[0, 20]
      user.username = data.name
      user.display_name = data.name
      user.skip_confirmation!
    end
  end
end
