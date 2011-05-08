var host = 'http://localhost:9292'

$(function(){
    showNotCompleteTasks();
    showCompleteTasks() ;
        
    $("#btn_new_task").click(
           function(){
                var task = $("#txt_new_task").val();
                newTask(task);  
                //$('body').load('/');
    });     
}); 

function newTask(task){
    $.ajax({
        type: 'POST',
        url: host+'/new_task/'+task,
        statusCode:{
            404:function(){alert('Erro ao criar nova tarefa - statuscode 400');},
            500:function(){alert('Erro ao criar nova tarefa - statuscode 500');}
            //,200:function(){alert('Tarefa criada com sucesso - 200');}
            },
        success:function(){
            showNotCompleteTasks();
            $("#txt_new_task").val('');
        }  
    });
}

function deleteTask(objImput){
    task = $(objImput).attr("itemid");
    $.ajax({
        type: 'DELETE', 
        url: host+'/delete_task/'+task,
        //beforeSend: function(){alert('isso')},
        statusCode: {
            //404:function(){alert("Falha ao deletar - statuscode 400");},
            //200:function(){alert("Deletado com sucesso - statuscode 200");}
            },
        success:function(){
            showNotCompleteTasks();
            showCompleteTasks(); 
        }
    });
}

function updateTask(id, description, complete){
    $.ajax({
        type: 'PUT',
        url: host+'/update_task/'+id+'/'+'/'+description+'/'+complete,
        statusCode:{
            404:function(){alert('Erro ao atualizar 400');}, 
            200:function(){alert('Atualizado com sucesso 200');}
            } 
    });
}

function managerTask(objCheck){
    task = $(objCheck).attr("itemid");
    if (objCheck.checked == true)
    {
       doneTask(task);    
    }
    else
    {
        undoneTask(task); 
    }
}

function doneTask(task){
     $.ajax({
        type: 'PUT',
        url: host+'/done_task/'+task,
        statusCode:{
            404:function(){alert('Erro ao atualizar 400');}, 
            //200:function(){alert('Atualizado com sucesso 200');}
            },
        success:function(){
            showNotCompleteTasks();
            showCompleteTasks();
            } 
    });
}

function undoneTask(task){
     $.ajax({
        type: 'PUT',
        url: host+'/undone_task/'+task,
        statusCode:{
            404:function(){alert('Erro ao atualizar 400');}, 
            //200:function(){alert('Atualizado com sucesso 200');}
            },
            success:function(){
                showNotCompleteTasks();
                showCompleteTasks();
                } 
    });
}

function showNotCompleteTasks(){
    $.get(host+'/tasks_not_complete',
        function(data){
             $('#tasks_not_complete').html('');  
             $('#tasks_not_complete').append(data);
         });
}

function showCompleteTasks(){
    $.get(host+'/tasks_complete',
        function(data){
             $('#tasks_complete').html('');
             $('#tasks_complete').append(data);
         });
}

