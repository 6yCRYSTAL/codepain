json.current_user current_user, :display_name, :username, :id
json.comments_count(@pen.comments_count)
json.comments @comments do |comment|
  json.content comment, :content, :id
  json.created_at time_ago_in_words(comment.created_at) + ' ago'
  json.user comment.user, :display_name, :username, :id
end
json.pen_created_on @pen.created_at.to_date.to_formatted_s(:long)
json.pen_updated_on @pen.updated_at.to_date.to_formatted_s(:long)