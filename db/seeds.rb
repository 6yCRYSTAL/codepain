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
#     username: Faker::Name.last_name,
#     display_name: Faker::Name.first_name
#   )
# end
# 10.times do
#   Pen.create(
#     title: Faker::Book.title ,
#     html: Faker::Lorem.paragraph(sentence_count: 10),
#     css: Faker::Lorem.paragraph(sentence_count: 10),
#     created_at: Faker::Time.between(from: DateTime.now - 1, to: DateTime.now),
#     random_url: Faker::Lorem.characters(number: 8),
#     user_id: 70
#   )
# end

# 5.times do
#   # password = "password"
#   user = User.new(
#     email: Faker::Internet.free_email,
#     password: "password",
#     username: Faker::Internet.first_name,
#     display_name: Faker::Name.first_name
#   )
#   user.save
# end

Product.create(
  [{
    plan: 'Annual Starter',
    desc: 'CodePain membership: Annual Starter',
    price: 96
  },
  {
    plan: 'Annual Developer',
    desc: 'CodePain membership: Annual Developer',
    price: 144
  },
  {
    plan: 'Annual Super',
    desc: 'CodePain membership: Annual Super',
    price: 312
  },
  {
    plan: 'Starter',
    desc: 'CodePain membership: Starter',
    price: 12
  },
  {
    plan: 'Developer',
    desc: 'CodePain membership: Developer',
    price: 19
  },
  {
    plan: 'Super',
    desc: 'CodePain membership: Super',
    price: 39
  }]
)