class ResourceBlueprint < Blueprinter::Base
  identifier :id

  view :normal do
    fields :category, :url
  end
end