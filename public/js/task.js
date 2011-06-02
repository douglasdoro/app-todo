var app = {
       message:    {
                    error: "Oops! Por favor, tente novamente.",
                    newTask: "Digite uma nova tarefa aqui e aperte enter.",
                    fieldEmpty: "Opa! É preciso informar uma tarefa."
                   },
       fieldEmpty: function(){ warning(this.message.fieldEmpty)},           
       warningError:    function(){ warning(this.message.error)},
       fillField:  function(){ fillFieldNewTask(this.message.newTask)},
       clearField: function(){ clearField()},
};

var task = {
       showTasks:  function(url){ tasks(url)}
}


/* Load Page */
$(function(){
    app.fillField();
    task.showTasks('/tasks');

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
        task.showTasks(this.href);
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
    $('#tasks').empty();
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

function alterStatusTask(objCheck){
    task = $(objCheck).attr("itemid");
    if (objCheck.checked == true) {
        setStatusTask('/done_task', task);    
    } else {
        setStatusTask('/undone_task', task); 
    }
}

function checkUncheckTask(url, task){
    if (url == '/done_task'){
        $('#span_'+task).addClass('task_complete');
        return;
    } 
    
    $('#span_'+task).removeClass('task_complete'); 
}

function appendTask(data){
     clearField("#txt_new_task");
     if($("#no_task:visible")[0]){
         $("#no_task").hide();
         $("#new_task ul").show();
     }

     $('#tasks').append(data);    
}

function hideTask(task){
    $('#cb_'+task).parent('div').fadeOut('slow');

    if ($(".tasks:visible").size() == 1){
        $("#new_task ul").hide();
        $('#no_task').html("").append("Não há Nenhuma tarefa no momento.").show();
    }
}

function showTasks(data, url){
     hiddenAjaxLoader();
     if (data == ''){    
         if (url == '/tasks'){
              $("#new_task ul").hide();
         }

         $('#no_task').html("").append("Não há Nenhuma tarefa no momento.").show();
         return;
     } 
         $('#no_task').hide(); 
         $('#tasks').append(data);
         $("#new_task ul").show();
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
        error: function(){ app.warningError(); }
    });
}

function deleteTask(objImput){
    task = $(objImput).attr("itemid");
    $.ajax({
        type: 'DELETE', 
        url: '/delete_task/'+task,
        success: function(){ hideTask(task); },
        error: function(){ app.warningError(); }
    });
}

function setStatusTask(url,task){
     $.ajax({
        type: 'PUT',
        url: url +'/'+task,
        success:function(){ checkUncheckTask(url, task) },
        error: function(){ app.warningError(); }
    });
}

function tasks(url){
    $.ajax({
            type: 'GET',
            url: url,
            beforeSend: function(){ showAjaxLoader(); },
            success: function(data){ showTasks(data, url); }
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
        error: function(){ app.warningError(); }
    });
}
