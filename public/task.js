$(document).ready(
        function(){
            $.get('http://localhost:9292/tasks_not_complete',
                 function(data){
                    $('#tasks_not_complete').append(data);
                 });

            $.get('http://localhost:9292/tasks_complete',
                function(data){
                    $('#tasks_complete').append(data);
                });

            $.ajax({
                type: 'POST',
                url: 'http://localhost:9292/new_task/novoJs',
                //data: "description=limpar",
                statusCode:{
                            404:function(){alert('Erro ao criar nova tarefa - statuscode 400');}, 
                            200:function(){alert('Tarefa criada com sucesso - 200');}
                            } 
                });

            $.ajax({
                //type: 'DELETE', //not supported
                type: 'GET',
                utl: "http://localhost:9292/delete_task/10",
                //data: "param=1",
                statusCode: {
                            404:function(){alert("Falha ao deletar - statuscode 400");},
                            200:function(){alert("Deletado com sucesso - statuscode 200");}
                            }
                });

             $.ajax({
                type: 'PUT',
                url: 'http://localhost:9292/update_task/11/atualizado/false',
                statusCode:{
                            404:function(){alert('Erro ao atualizar 400');}, 
                            200:function(){alert('Atualizado com sucesso 200');}
                            } 
                });

              $("#btn_new_task").click(function(){
                      alert("clicou no botao");
                      });     

        });   
