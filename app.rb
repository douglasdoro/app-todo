require "sinatra" 
require "json"
load "task.rb"

get '/' do
    erb :index 
end

get '/tasks' do 
    @tasks = Task.all
    erb :tasks
end

get '/tasks_complete' do
    @tasks = Task.where(:complete => true).order(:date.desc).limit(10)
    erb :tasks
end 

get '/tasks_not_complete' do
    @tasks = Task.where(:complete => false).order(:date.desc).limit(20)
    erb :tasks 
end

post '/new_task/:description' do
    task = Task.where(:id =>
        Task.insert(:description => params[:description],
                    :complete    => false,
                    :date        => Time.now)).first
     
    content_type :json
    task.values.to_json
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
end

put '/undone_task/:id' do
    Task.where(:id => params[:id]).update(
        :complete => false,
        :date     => Time.now)
end

