var host = 'http://localhost:9292';
var textTask= 'Digite uma nova tarefa aqui.';

$(function(){
    fillTaskText();
    showAllTasks();

    $("#txt_new_task").keypress(function(event){
        if (event.which == '13')
        {
            $("#btn_new_task").click();
        }
     });

    $("#btn_new_task").click(
           function(){
                var task = $("#txt_new_task").val();
                if (task == '' || task == textTask)
                {
                    alert('preenche a bagaça')
                }
                else
                {
                    newTask(task);  
                    $("#txt_new_task").focus();
                }    
           });
    
    $('#options #done').click(function(){
           showCompleteTasks();
            $('#options #done').css('display', 'none');
            $('#options #undone').css('display','inline');
            $('#options #all').css('display','inline');
            
            $('#options h3').empty();
            $('#options h3').append($('#options #done').text());
     });
   
    $('#options #undone').click(function(){
           showNotCompleteTasks()         
           $('#options #undone').css('display', 'none');
           $('#options #done').css('display','inline');
           $('#options #all').css('display','inline');
 
           $('#options h3').empty();
           $('#options h3').append($('#options #undone').text());
     });

    $('#options #all').click(function(){
           showAllTasks();          
           $('#options #all').css('display', 'none');
           $('#options #undone').css('display','inline');
           $('#options #done').css('display','inline');
 
           $('#options h3').empty();
    });
}); 

function fillTaskText(){
    if ($("#txt_new_task").val() == '')
    {
        $("#txt_new_task").val(textTask);    
    }
}

function clearField(field){
    $(field).val('');
}

function newTask(task){
    $.ajax({
        type: 'POST',
        url: host+'/new_task/'+task,
        dataType: 'json',
        statusCode: {
                404:function(){alert('Erro ao criar nova tarefa - statuscode 400');},
                500:function(){alert('Erro ao criar nova tarefa - statuscode 500');}
                //,200:function(){alert('Tarefa criada com sucesso - 200');}
            },
        success: function(data){
                $("#txt_new_task").val('');
                appendTask(data);
            }  
    });
}

function appendTask(data){
    $('#tasks').append(    
        "<div id='div_"+data.id+"'class='tasks' style='display:none' >" +
   	    	"<input type='checkbox' id='cb_"+data.id+"' itemid='"+data.id+"' onclick='managerTask(this);'/>" +
        	"<label for='cb_"+data.id+"'/>" +
        	"<span id='span_"+data.id+"'>"+data.description+"</span>" +
        	"<div class='options_task'>" +
   	        	"<input type='image' src='/images/edit.png' class='btn_edit' itemid='"+data.id+"' onclick='showFormToEditTask(this);return false;'/>" +
   	        	"<input type='image' src='/images/trash.png' class='btn_delete' itemid='"+data.id+"' onclick='deleteTask(this);return false;'/>" +
        	"</div>" +
            "<div id='div_edit_task_"+data.id+"' class='edit_task'>" +
                "<input type='text' id='txt_edit_task_"+data.id+"' itemid='"+data.id+"' class='txt_edit_task' value=''/>" +
                "<input type='button' class='btn_edit_ok' value='OK' itemid='"+data.id+"' onClick='updateTask(this);'/>" +                
                "<input type='button' class='btn_edit_cancel' value='Cancelar' itemid='"+data.id+"' onClick='hiddenFormOfEditTask(this);return false;'/>" +
            "</div>" +
   	    "</div>");
    
    $("#div_"+data.id).fadeIn('slow');
           
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
            $('#cb_'+task).parent('div').fadeOut('slow');
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
            $('#span_'+task).addClass('task_complete');    
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
                $('#span_'+task).removeClass('task_complete'); 
            } 
    });
}

function showNotCompleteTasks(){
    $.get(host+'/tasks_not_complete',
        function(data){
             $('#tasks').empty();  
             $('#tasks').append(data);
         });
}

function showCompleteTasks(){
    $.get(host+'/tasks_complete',
        function(data){
             $('#tasks').empty();
             $('#tasks').append(data);
         });
}

function showAllTasks(){
    $.get(host+'/tasks',
            function(data){
                $('#tasks').empty();
                $('#tasks').append(data);
            });
}

function showFormToEditTask(element){
    var taskId = $(element).attr('itemid');
    $('#txt_edit_task_'+taskId).val($.trim($('#span_'+taskId).text()));
    $('#div_edit_task_'+taskId).css('display', 'block');
    $('#txt_edit_task_'+taskId).focus(); 
}

function hiddenFormOfEditTask(element){
    var taskId = $(element).attr('itemid');
    $('#div_edit_task_'+taskId).css('display', 'none');
}

function updateTask(element){
    var taskId = $(element).attr('itemid');
    var description = $('#txt_edit_task_'+taskId).val();
    
    $.ajax({
        type: 'PUT',
        url: host+'/update_task/'+taskId+'/'+description,
        statusCode:{
            404:function(){alert('Erro ao atualizar 400');}, 
            // 200:function(){alert('Atualizado com sucesso 200');}
            },
        success: function(){
            $('#span_'+taskId).text($.trim($('#txt_edit_task_'+taskId).val()));
                hiddenFormOfEditTask(element);    
            } 
    });
}
