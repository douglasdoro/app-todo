require 'sequel'

Sequel.connect('sqlite://db/todo.db')

class Task < Sequel::Model
end

