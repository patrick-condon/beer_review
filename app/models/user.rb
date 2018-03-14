# Include default devise modules. Others available are:
# :confirmable, :lockable, :timeoutable and :omniauthable
class User < ApplicationRecord
  has_many :reviews

  validates :username, uniqueness: true
  validates :username, presence: true

  mount_uploader :profile_photo, ProfilePhotoUploader

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
