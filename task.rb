require 'sequel'

Sequel.connect('sqlite://db/todo.sqlite3')

class Task < Sequel::Model
end

