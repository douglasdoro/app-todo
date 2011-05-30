load 'app.rb'
run Sinatra::Application

configure do 
    set :jquery, "/js/jquery-1.6.1.min.js"
end

configure :production do
    set :jquery, "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"
end

