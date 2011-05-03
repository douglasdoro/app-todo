function aviso(msg){
    alert(msg);
};

$(document).ready(
        function(){
            aviso("carregou a página");
            $.get('http://localhost:9292/tasks_not_complete',
                 function(data){
                    $('#tasks_not_complete').append(data);
                 });
            $.get('http://localhost:9292/tasks_complete',
                function(data){
                    $('#tasks_complete').append(data);
                });

});   
