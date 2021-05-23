class PenBlueprint < Blueprinter::Base
  identifier :id

  view :normal do
    fields :title, :html, :css, :js, :random_url
  end

  view :extended do
    include_view :normal
    fields :created_at, :updated_at, :comments_count, :edit_view_count
    field :lovers do |pen, opts|
      pen.lovers
    end
    association :user, blueprint: UserBlueprint, view: :normal
  end
end