require 'rake'
#require 'rake/testtask'
#require 'rake/rdoctask'

#Dir["#{File.dirname(__FILE__)}/tasks/**/*.rake"].sort.each { |ext| load ext }

namespace :db do
    require 'rubygems'
    require 'sequel'
    Sequel.extension :migration

    task :migrate do
        m = Sequel::Migrator
        db = Sequel.connect(ENV['DATABASE_URL'] || 'sqlite://db/tasks.sqlite3')
        dir = "db/migrations"

        target = ENV['TARGET'] ? ENV['TARGET'].to_i : nil
        current = ENV['CURRENT'] ? ENV['CURRENT'].to_i : nil
        m.run(db, dir, :target => target, :current => current)
    end
end
