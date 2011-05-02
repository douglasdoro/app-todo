#! /Users/douglasfontes/.rvm/rubies/ruby-1.9.2-p180/bin/ruby 
require "sinatra" 
load "task.rb"

#cria a tabela no banco caso ela nao exista
# unless Data.table_exists?('tasks')
#    Data.create_table :tasks do
#        primary_key :id
#        String      :description
#        Boolean     :complete
#    end
#end

get '/' do
    erb :index 
end

get '/show_tasks' do 
    #get in sinatra show something
    @tasks = Task.all
    erb :tasks 
end

post '/new_task' do
    #post in sinatra create something
    Task.insert(:description =>'Cortar a grama', :complete => false)
    "create ok"
end

put '/update_task' do
    #put in sinatra update somethig
    Task.where(:id => 15).update :description => "Atualizado pelo site", :complete => true
    "update task"
end

delete '/delete_task' do
    #delete in sinatra delete something
    Task.where(:id => 12).delete
    "Delete task"
end
