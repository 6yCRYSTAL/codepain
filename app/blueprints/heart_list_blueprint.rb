class HeartListBlueprint < Blueprinter::Base
  # identifier :user_id


  view :pen do
    fields :loved?
  end
end