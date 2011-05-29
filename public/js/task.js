var textTask= 'Digite uma nova tarefa aqui e aperte enter.';
var errorCall= "Opa!. Por favor, tente novamente.";

$(function(){
    fillTaskText();
    showTasks('/tasks');

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
                    warning('Informe uma tarefa.');
                }
                else
                {
                    newTask(task);  
                }    
                $("#txt_new_task").focus();
           });
    
    $('#done').click(function(){
            showTasks('/tasks_complete');         
     });
   
    $('#undone').click(function(){
           showTasks('/tasks_not_complete');         
     });

    $('#all').click(function(){
           showTasks('/tasks');         
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

function warning(error){
    $('#alert').empty().append(error).fadeIn().delay(5000).fadeOut();
}

function showAjaxLoader(){
    $('#loader').show();
}

function hiddenAjaxLoader(){
    $('#loader').hide();
}

function newTask(task){
    $.ajax({
        type: 'POST',
        url: '/new_task/'+task,
        dataType: 'json',
        success: function(data){
                clearField("#txt_new_task");
                if($("#no_task:visible")[0])
                {
                     $("#no_task").hide();
                }
                 appendTask(data);
            },
        error: function(){
                warning(errorCall);
            }  
    });
}

function appendTask(data){
    $('#tasks').append(    
        "<div id='div_"+data.id+"'class='tasks' style='display:none' >" +
   	    	"<input type='checkbox' id='cb_"+data.id+"' itemid='"+data.id+"' onclick='managerTask(this);'/>" +
        	"<label for='cb_"+data.id+"'/>" +
        	"<span id='span_"+data.id+"'>&nbsp;"+data.description+"</span>" +
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
        url: '/delete_task/'+task,
        success:function(){
            $('#cb_'+task).parent('div').fadeOut('slow');
            if ($(".tasks:visible").size() == 1) 
            {
                $("#no_task").show();
            }
        },
        error: function(){
            warning(errorCall);
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
        url: '/done_task/'+task,
        success:function(){
            $('#span_'+task).addClass('task_complete');    
        },
        error: function(){
            warning(errorCall);
        } 
    });
}

function undoneTask(task){
     $.ajax({
        type: 'PUT',
        url: '/undone_task/'+task,
        success:function(){
                $('#span_'+task).removeClass('task_complete'); 
        },
        error: function(){
            warning(errorCall);
        } 
    });
}

function showTasks(url){
    $.ajax({
            type: 'GET',
            url: url,
            beforeSend: function(){ 
                    $('#tasks').empty();
                    showAjaxLoader();
                },
            success: function(data){
                   hiddenAjaxLoader();
                   if (data == '')
                   {
                       $('#tasks').append("<div id='no_task'>Não há Nenhuma tarefa no momento.</div>");
                   }
                   else
                   { 
                       $('#tasks').append(data);
                   }
            }
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
        url: '/update_task/'+taskId+'/'+description,
        success: function(){
            $('#span_'+taskId).text($.trim($('#txt_edit_task_'+taskId).val()));
                hiddenFormOfEditTask(element);    
            },
        error: function(){
            warning(errorCall);
        } 
    });
}