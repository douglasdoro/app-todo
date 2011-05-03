require 'sequel'

#cria a tabela no banco caso ela nao exista
=begin
Data = Sequel.sqlite 'todo.db'
unless Data.table_exists?('tasks')
    Data.create_table :tasks do
        primary_key :id
        String      :description
        Boolean     :complete
    end
end
=end

Sequel.connect('sqlite://todo.db')

class Task < Sequel::Model
end

