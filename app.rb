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
    @tasks = Task.where(:complete => true).order(:date.desc).limit(10)
    erb :tasks
end 

get '/tasks_not_complete' do
    @tasks = Task.where(:complete => false).order(:date.desc).limit(20)
    erb :tasks 
end

post '/new_task/:description' do
    Task.insert(:description => params[:description],
                :complete    => false,
                :date        => Time.now)
end

put '/update_task/:id/:description/:complete' do
    Task.where(:id => params[:id]).update(
        :description => params[:description],
        :complete    => params[:complete],
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

