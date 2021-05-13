# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'date'
# 10.times do
#   # password = "password"
#   user = User.create(
#     email: Faker::Internet.free_email,
#     password: "password",
#     username: Faker::Internet.username,
#     display_name: Faker::Name.first_name
#   )
# end
10.times do
  Pen.create(
    title: Faker::Book.title ,
    html: Faker::Lorem.paragraph(sentence_count: 10),
    css: Faker::Lorem.paragraph(sentence_count: 10),
    created_at: Faker::Time.between(from: DateTime.now - 1, to: DateTime.now),
    random_url: Faker::Lorem.characters(number: 8),
    user_id: 45
  )
end
