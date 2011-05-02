#! /Users/douglasfontes/.rvm/rubies/ruby-1.9.2-p180/bin/ruby 
require "sinatra" 
require "sequel"

#Acessa a base
Data = Sequel.connect('sqlite://todo.db')

#cria a tabela no banco caso ela nao exista
unless Data.table_exists?('tasks')
    Data.create_table :tasks do
        primary_key :id
        String      :description
        Boolean     :complete
    end
end

get '/show_tasks' do 
    #get in sinatra show something
    Data = Sequel.connect('sqlite://todo.db')
    @tasks = Data[:tasks]
    erb :tasks 
end

post '/new_task' do
    #post in sinatra create something
    Data = Sequel.connect('sqlite://todo.db')
    Data[:tasks].insert(:description =>'Cortar a grama', :complete => false)
    "create ok"
end

put '/update_task' do
    #put in sinatra update somethig
    Data = Sequel.connect('sqlite://todo.db')
    Data[:tasks].where(:id => 5).update :description => "Atualizado pelo site", :complete => true
    "update task"
end

delete '/delete_task' do
    #delete in sinatra delete something
    Data = Sequel.connect('sqlite://todo.db')
    Data[:tasks].where(:id => 4).delete
    "Delete task"
end
