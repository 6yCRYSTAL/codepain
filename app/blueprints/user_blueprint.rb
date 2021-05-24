class UserBlueprint < Blueprinter::Base
  identifier :id

  view :normal do
    fields :username, :display_name
    association :love_pens, blueprint: HeartListBlueprint, view: :love_pens
  end
end