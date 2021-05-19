namespace :db do
  desc 'Reset counter cache of comments count in pen.'
  task :update_comments => :environment do
    print '開始更新任務數'
    Pen.all.each do |p|
      Pen.reset_counters(p.id, :comments)
      print '.'
    end
    puts '更新完成！'
  end
end