class HeartListBlueprint < Blueprinter::Base
  view :love_pens do
    fields :id, :random_url
  end
end