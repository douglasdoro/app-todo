require 'sequel'

Sequel.connect(ENV['DATABASE_URL'] || 'sqlite://db/todo.sqlite3')

class Task < Sequel::Model
end

