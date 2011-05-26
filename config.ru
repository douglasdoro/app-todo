load 'app.rb'
run Sinatra::Application

configure do 
    set :host_url, "var host = 'http://localhost:9292';"
end

configure :production do
    set :host_url, "var host = 'hhttp://tarefas.heroku.com';"
end

