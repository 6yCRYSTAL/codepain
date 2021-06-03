# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_06_03_142608) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "content"
    t.bigint "user_id", null: false
    t.bigint "pen_id", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["deleted_at"], name: "index_comments_on_deleted_at"
    t.index ["pen_id"], name: "index_comments_on_pen_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "follows", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "following_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["follower_id", "following_id"], name: "index_follows_on_follower_id_and_following_id", unique: true
    t.index ["follower_id"], name: "index_follows_on_follower_id"
    t.index ["following_id"], name: "index_follows_on_following_id"
  end

  create_table "heart_lists", force: :cascade do |t|
    t.bigint "pen_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["pen_id"], name: "index_heart_lists_on_pen_id"
    t.index ["user_id"], name: "index_heart_lists_on_user_id"
  end

  create_table "impressions", force: :cascade do |t|
    t.string "impressionable_type"
    t.integer "impressionable_id"
    t.integer "user_id"
    t.string "controller_name"
    t.string "action_name"
    t.string "view_name"
    t.string "request_hash"
    t.string "ip_address"
    t.string "session_hash"
    t.text "message"
    t.text "referrer"
    t.text "params"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["controller_name", "action_name", "ip_address"], name: "controlleraction_ip_index"
    t.index ["controller_name", "action_name", "request_hash"], name: "controlleraction_request_index"
    t.index ["controller_name", "action_name", "session_hash"], name: "controlleraction_session_index"
    t.index ["impressionable_type", "impressionable_id", "ip_address"], name: "poly_ip_index"
    t.index ["impressionable_type", "impressionable_id", "params"], name: "poly_params_request_index"
    t.index ["impressionable_type", "impressionable_id", "request_hash"], name: "poly_request_index"
    t.index ["impressionable_type", "impressionable_id", "session_hash"], name: "poly_session_index"
    t.index ["impressionable_type", "message", "impressionable_id"], name: "impressionable_type_message_index"
    t.index ["user_id"], name: "index_impressions_on_user_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "user_id", null: false
    t.string "payment_method"
    t.string "serial"
    t.datetime "purchased_at"
    t.integer "total_amount"
    t.string "ecpay_tradeno"
    t.integer "ecpay_chargefee"
    t.string "ecpay_check_mac_value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["product_id"], name: "index_orders_on_product_id"
    t.index ["serial"], name: "index_orders_on_serial"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "pens", force: :cascade do |t|
    t.string "title", default: "Untitled", null: false
    t.text "html", default: ""
    t.text "css", default: ""
    t.text "js", default: ""
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "random_url"
    t.bigint "user_id", null: false
    t.string "state", default: "editing"
    t.integer "edit_view_count", default: 0
    t.integer "comments_count", default: 0
    t.integer "heart_lists_count", default: 0
    t.boolean "private", default: false
    t.index ["deleted_at"], name: "index_pens_on_deleted_at"
    t.index ["random_url"], name: "index_pens_on_random_url", unique: true
    t.index ["title"], name: "index_pens_on_title"
    t.index ["user_id"], name: "index_pens_on_user_id"
  end

  create_table "pins", force: :cascade do |t|
    t.bigint "pen_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["pen_id"], name: "index_pins_on_pen_id"
    t.index ["user_id"], name: "index_pins_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "plan"
    t.string "desc"
    t.integer "price"
    t.string "period"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "monthly_rate"
    t.integer "annual_rate"
    t.string "subtitle"
    t.index ["period"], name: "index_products_on_period"
    t.index ["plan"], name: "index_products_on_plan"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username", null: false
    t.string "bio", default: ""
    t.string "display_name", null: false
    t.string "provider"
    t.string "uid"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "membership", default: "free"
    t.datetime "subscribed_at"
    t.datetime "expired_at"
    t.datetime "unsubscribed_at"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["expired_at"], name: "index_users_on_expired_at"
    t.index ["membership"], name: "index_users_on_membership"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username"
  end

  add_foreign_key "comments", "pens"
  add_foreign_key "comments", "users"
  add_foreign_key "heart_lists", "pens"
  add_foreign_key "heart_lists", "users"
  add_foreign_key "orders", "products"
  add_foreign_key "orders", "users"
  add_foreign_key "pens", "users"
  add_foreign_key "pins", "pens"
  add_foreign_key "pins", "users"
end
