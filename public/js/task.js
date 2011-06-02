var app = {
       message:    {
                    error: "Oops! Por favor, tente novamente.",
                    newTask: "Digite uma nova tarefa aqui e aperte enter.",
                    fieldEmpty: "Opa! É preciso informar uma tarefa."
                   },
       fieldEmpty: function(){ warning(this.message.fieldEmpty)},           
       warning:    function(){ warning(this.message.error)},
       fillField:  function(){ fillFieldNewTask(this.message.newTask)},
       clearField: function(){ clearField()},
       showTasks:  function(){ showTasks('/tasks')}
};



$(function(){
    app.fillField();
    app.showTasks();

    $("#txt_new_task").keypress(function(event){
        if (event.which == '13'){
            $("#btn_new_task").click();
        }
     });

    $("#btn_new_task").click(function(){
        newTask($("#txt_new_task").val());
        $("#txt_new_task").focus();
     });
    
    $(".links_status_task").click(function(){
        showTasks(this.href);
        return false;
    });

    $("#print").click(function(){
            window.print();
            return false;
    });
}); 

/* comportamento da interface */

function fillFieldNewTask(msg){
    if ($("#txt_new_task").val() == ''){
        $("#txt_new_task").val(msg);    
    }
}

function clearField(){
    $("#txt_new_task").val('');
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

function managerTask(objCheck){
    task = $(objCheck).attr("itemid");
    if (objCheck.checked == true) {
       doneTask(task);    
    } else {
        undoneTask(task); 
    }
}

function appendTask(data){
     clearField("#txt_new_task");
     if($("#no_task:visible")[0]){
         $("#no_task").hide();
         $("#new_task ul").show();
     }

     $('#tasks').append(data);    
}

/* Chamadas Ajax */

function newTask(task){
    if(task == '' || task == app.message.newTask){
        app.fieldEmpty();
        return;
    }
  
    $.ajax({
        type: 'POST',
        url: '/new_task/'+task,
        success: function(data){ appendTask(data); },
        error: function(){ warning(app.message.error); }
    });
}

function hideTask(task){
    $('#cb_'+task).parent('div').fadeOut('slow');

    if ($(".tasks:visible").size() == 1){
        $("#new_task ul").hide();
        $('#no_task').html("").append("Não há Nenhuma tarefa no momento.").show();
    }
}

function deleteTask(objImput){
    task = $(objImput).attr("itemid");
    $.ajax({
        type: 'DELETE', 
        url: '/delete_task/'+task,
        success: function(){ hideTask(task); },
        error: function(){
            warning(errorCall);
        }
    });
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
                       if (url == '/tasks')
                       {
                            $("#new_task ul").hide();
                       }

                       $('#no_task').html("").append("Não há Nenhuma tarefa no momento.").show();
                   }
                   else
                   {   
                       $('#no_task').hide(); 
                       $('#tasks').append(data);
                       $("#new_task ul").show();
                   }
            }
    });
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
