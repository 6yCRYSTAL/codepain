json.comments_count(@pen.comments_count)
json.comments @comments do |comment|
  json.content comment, :content, :id
  json.created_at time_ago_in_words(comment.created_at) + ' ago'
  json.user comment.user, :display_name, :username, :id
end