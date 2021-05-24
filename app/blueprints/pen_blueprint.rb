class PenBlueprint < Blueprinter::Base
  identifier :id

  view :normal do
    fields :title, :html, :css, :js, :random_url, :updated_at
  end

  view :extended do
    include_view :normal
    fields :created_at, :comments_count, :edit_view_count, :heart_lists_count
    association :user, blueprint: UserBlueprint, view: :normal
  end
end