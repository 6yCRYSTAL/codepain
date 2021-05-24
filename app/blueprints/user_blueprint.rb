class UserBlueprint < Blueprinter::Base
  identifier :id

  view :normal do
    fields :username, :display_name#, :membership 暫時拿掉 會員功能還未開放
    association :love_pens, blueprint: HeartListBlueprint, view: :love_pens
  end
end