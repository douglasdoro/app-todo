require 'sequel'

Sequel.connect('sqlite://todo.db')

class Task < Sequel::Model
end

