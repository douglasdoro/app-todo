require "sinatra" 
require 'sequel'
 
Sequel.connect(ENV['DATABASE_URL'] || 'sqlite://db/tasks.sqlite3')

class Task < Sequel::Model
end

get('/login') {erb :login}

get('/') {erb :index}

get '/tasks' do 
    @tasks = Task.all
    erb :tasks, :layout => false
end

get '/tasks_complete' do
    @tasks = Task.where(:complete => true).order(:date.desc).limit(20)
    erb :tasks, :layout => !request.xhr?
end 

get '/tasks_not_complete' do
    @tasks = Task.where(:complete => false).order(:date.desc).limit(20)
    erb :tasks, :layout => !request.xhr?
end

post '/new_task/:description' do
    @task = Task.where(:id =>
        Task.insert(:description => params[:description],
                    :complete    => false,
                    :date        => Time.now)).first
     
    erb :task, :layout => false 
end

put '/update_task/:id/:description' do
    Task.where(:id => params[:id]).update(
        :description => params[:description],
        :date        => Time.now)
end

delete '/delete_task/:id' do
    Task.where(:id => params[:id]).delete
end

put '/done_task/:id' do
    Task.where(:id => params[:id]).update(
        :complete => true,
        :date     => Time.now) 
    response.status
end

put '/undone_task/:id' do
    Task.where(:id => params[:id]).update(
        :complete => false,
        :date     => Time.now)
    response.status
end

