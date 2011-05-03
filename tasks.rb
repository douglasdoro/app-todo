#! /Users/douglasfontes/.rvm/rubies/ruby-1.9.2-p180/bin/ruby 
require "sinatra" 
load "task.rb"


get '/' do
    erb :index 
end

get '/tasks' do 
    #get in sinatra show something
    @tasks = Task.all
    erb :tasks 
end

get '/tasks_complete' do
    @tasks = Task.where(:complete => true)
    erb :tasks
end 

get '/tasks_not_complete' do
    @tasks = Task.where(:complete => false)
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
