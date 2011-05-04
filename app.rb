#! /Users/douglasfontes/.rvm/rubies/ruby-1.9.2-p180/bin/ruby 
require "sinatra" 
load "task.rb"

get '/' do
    erb :index 
end

get '/tasks' do 
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

post '/new_task/:description' do
    Task.insert(:description => params[:description], :complete => false)
end

put '/update_task/:id/:description/:complete' do
    Task.where(:id => params[:id]).update(
        :description => params[:description],
        :complete => params[:complete])
end

delete '/delete_task/:id' do
    Task.where(:id => params[:id]).delete
end
