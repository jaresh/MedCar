$(document).ready(function() {

  /*
  =============================
          FUNCTIONS
  =============================
  */

  function HideAll(){
    $("#docaddform").hide();
    $("#useraddform").hide();
    $("#doclist").hide();
    $("#userlist").hide();
  }


  function UserList(e){
    e.preventDefault();
      $.ajax({
        url: '/api/userslist',
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#usertable").empty();
          $("#usertable").append("<tr><th>Imie</th><th>Nazwisko</th><th>Pesel</th><th>Data urodzenia</th><th>Akcje</th></tr>");
          $.each(response.docs, function(key, value) {

              $("#usertable tbody").append(
                "<tr>"+
                  "<th>"+ value.name +"</th>"+
                  "<th>"+ value.lastname +"</th>"+
                  "<th>" + value.pesel + "</th>"+
                  "<th>" + value.dateofbirth + "</th>"+
                  "<th>  <button class='userdeletebtn' data-value="+ value.pesel + ">Usuń</button> <button class='usereditbtn' data-value="+ value.pesel + ">Edytuj</button> </th>"+
                "</tr>"
              );

          });

          HideAll();
          $("#userlist").toggle("slow");
        },
        error: function() {
          console.log("Błąd AJAX");
        },
      });
  }

  function DocList(e){
    e.preventDefault();
      $.ajax({
        url: '/api/doclist',
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#doctable").empty();
          $("#doctable").append("<tr><th>Imie</th><th>Nazwisko</th> <th>Dnie pracujące</th><th>Akcje</th></tr>");
          $.each(response.docs, function(key, value) {
            var workingdays = "";

            $.each(value.workingdays, function(key,day){

              if(day && key == 'pon')
              {
                workingdays = "poniedziałek, " + workingdays ;
              }
               if(day && key == 'wt')
              {
                workingdays =  "wtorek, " + workingdays;
              }
               if(day && key == 'sr')
              {
                workingdays =  "środa, " + workingdays ;
              }
               if(day && key == 'czw')
              {
                workingdays = "czwartek, " + workingdays ;
              }
               if(day && key == 'pi')
              {
                workingdays = "piątek, " + workingdays ;
              }
               if(day && key == 'so')
              {
                workingdays = "sobota, " + workingdays ;
              }
               if(day && key == 'ni')
              {
                workingdays = "niedziela, " + workingdays ;
              }
            });
              $("#doctable tbody").append(
                "<tr>"+
                  "<th>"+ value.name +"</th>"+
                  "<th>"+ value.lastname +"</th>"+
                  "<th>" + workingdays + "</th>"+
                  "<th>  <button class='docdeletebtn' data-name='"+ value.name + "' data-lastname='" + value.lastname + "'>Usuń</button> <button class='doceditbtn' data-name='"+ value.name + "' data-lastname='" + value.lastname + "'>Edytuj</button> </th>"+
                "</tr>"
              );
          });
          HideAll();
          $("#doclist").toggle("slow");
        },
        error: function() {
          console.log("Błąd AJAX");
        },
      });
  }

  HideAll();

  /*
  =============================
      DOC ADD,EDIT,DELETE FORM
  =============================
  */

  //Doc add

  $("#docadd").click(function () {
    for(var i = 1 ; i < 8; i++){
          $("#" + i + "hours").hide();
    }
    $("#docaddform").attr("action",'/api/docadd');
    $("#docsubmitbutton").text("Dodaj lekarza");
    $('#ponworking').prop('checked', false);
    $('#admindocform input[name="ponbegin"]').attr('value','8');
    $('#admindocform input[name="ponend"]').attr('value','8')
    $('#wtworking').prop('checked', false);
    $('#admindocform input[name="wtbegin"]').attr('value','8');
    $('#admindocform input[name="wtend"]').attr('value','8')
    $('#srworking').prop('checked', false);
    $('#admindocform input[name="srbegin"]').attr('value','8');
    $('#admindocform input[name="srend"]').attr('value','8')
    $('#czwworking').prop('checked', false);
    $('#admindocform input[name="czwbegin"]').attr('value','8');
    $('#admindocform input[name="czwend"]').attr('value','8')
    $('#piworking').prop('checked', false);
    $('#admindocform input[name="pibegin"]').attr('value','8');
    $('#admindocform input[name="piend"]').attr('value','8')
    $('#soworking').prop('checked', false);
    $('#admindocform input[name="sobegin"]').attr('value','8');
    $('#admindocform input[name="soend"]').attr('value','8')
    $('#niworking').prop('checked', false);
    $('#admindocform input[name="nibegin"]').attr('value','8');
    $('#admindocform input[name="niend"]').attr('value','8')
    HideAll();
    $("#docaddform").toggle("slow");
  });

  //Doc delete

  $('body').on("click", ".docdeletebtn", function (e){
      e.preventDefault();
      $.ajax({
        url: '/api/docdelete/' + $(this).attr("data-name") + "/" + $(this).attr("data-lastname"),
        type: 'GET',
        success: function(response) { 
          HideAll();
          DocList(e);
        },
        error: function(xhRequest, ErrorText, thrownError) {
          console.log(ErrorText);
        },
      });
  });

  //Doc edit

  $('body').on("click", ".doceditbtn", function (e){
    $("#docsubmitbutton").text("Edytuj lekarza");
    e.preventDefault();
    $.ajax({
      url: '/api/docone/' + $(this).attr("data-name") + '/' + $(this).attr("data-lastname"),
      type: 'GET',
      success: function(response) { 
        $("#admindocform input[name='login']").attr("value",response.docs.login);
        $("#admindocform input[name='name']").attr("value",response.docs.name);
        $("#admindocform input[name='lastname']").attr("value",response.docs.lastname);
        if(response.docs.workingdays.pon)
        {
          $('#ponworking').prop('checked', true);
          $('#1hours').show();
          $('#admindocform input[name="ponbegin"]').attr('value',response.docs.workinghours.ponbegin);
          $('#admindocform input[name="ponend"]').attr('value',response.docs.workinghours.ponend)
        }
        else
        {
          $('#ponworking').prop('checked', false);
          $('#1hours').hide();
        }
        if(response.docs.workingdays.wt)
        {
          $('#wtworking').prop('checked', true);
          $('#2hours').show();
          $('#admindocform input[name="wtbegin"]').attr('value',response.docs.workinghours.wtbegin);
          $('#admindocform input[name="wtend"]').attr('value',response.docs.workinghours.wtend)
        }
        else
        {
          $('#wtworking').prop('checked', false);
          $('#2hours').hide();
        }
        if(response.docs.workingdays.sr)
        {
          $('#srworking').prop('checked', true);
          $('#3hours').show();
          $('#admindocform input[name="srbegin"]').attr('value',response.docs.workinghours.srbegin);
          $('#admindocform input[name="srend"]').attr('value',response.docs.workinghours.srend)
        }
        else
        {
          $('#srworking').prop('checked', false);
          $('#3hours').hide();
        }
        if(response.docs.workingdays.czw)
        {
          $('#czwworking').prop('checked', true);
          $('#4hours').show();
          $('#admindocform input[name="czwbegin"]').attr('value',response.docs.workinghours.czwbegin);
          $('#admindocform input[name="czwend"]').attr('value',response.docs.workinghours.czwend)
        }
        else
        {
          $('#czwworking').prop('checked', false);
          $('#4hours').hide();
        }
        if(response.docs.workingdays.pi)
        {
          $('#piworking').prop('checked', true);
          $('#5hours').show();
          $('#admindocform input[name="pibegin"]').attr('value',response.docs.workinghours.pibegin);
          $('#admindocform input[name="piend"]').attr('value',response.docs.workinghours.piend)
        }
        else
        {
          $('#piworking').prop('checked', false);
          $('#5hours').hide();
        }
        if(response.docs.workingdays.so)
        {
          $('#soworking').prop('checked', true);
          $('#6hours').show();
          $('#admindocform input[name="sobegin"]').attr('value',response.docs.workinghours.sobegin);
          $('#admindocform input[name="soend"]').attr('value',response.docs.workinghours.soend)
        }
        else
        {
          $('#soworking').prop('checked', false);
          $('#6hours').hide();
        }
        if(response.docs.workingdays.ni)
        {
          $('#niworking').prop('checked', true);
          $('#7hours').show();
          $('#admindocform input[name="nibegin"]').attr('value',response.docs.workinghours.nibegin);
          $('#admindocform input[name="niend"]').attr('value',response.docs.workinghours.niend)
        }
        else
        {
          $('#niworking').prop('checked', false);
          $('#7hours').hide();
        }

        $("#admindocform").attr("action",'/api/docedit/' + response.docs.name + '/' + response.docs.lastname);

        HideAll();
        $("#doclist").toggle("slow");
        $("#docaddform").toggle("slow");
      },
      error: function(xhRequest, ErrorText, thrownError) {
        console.log(ErrorText);
      },
    });
  });

  /*
  =============================
      USER ADD,DELETE,EDIT FORM
  =============================
  */

  //User add

  $("#useradd").click(function () {
    $("#useraddform").attr("action",'/api/useradd');
    $("#usersubmitbutton").text("Dodaj pacjenta");
    $("#adminuserform input[name='login']").attr("value","");
    $("#adminuserform input[name='name']").attr("value","");
    $("#adminuserform input[name='secondname']").attr("value","-");
    $("#adminuserform input[name='lastname']").attr("value","");
    $("#adminuserform input[name='pesel']").attr("value","");
    $("#adminuserform input[name='dateofbirth']").attr("value","");
    HideAll();
    $("#useraddform").toggle("slow");
  });

  //User delete

  $('body').on("click", ".userdeletebtn", function (e){
      e.preventDefault();
      $.ajax({
        url: '/api/userdelete/' + $(this).attr("data-value"),
        type: 'GET',
        success: function(response) { 
          HideAll();
          UserList(e);
        },
        error: function(xhRequest, ErrorText, thrownError) {
          console.log(ErrorText);
        },
      });
  });

  //User edit

  $('body').on("click", ".usereditbtn", function (e){
    $("#usersubmitbutton").text("Edytuj pacjenta");
    e.preventDefault();
    $.ajax({
      url: '/api/userone/' + $(this).attr("data-value"),
      type: 'GET',
      success: function(response) { 
        $("#adminuserform input[name='login']").attr("value",response.docs.login);
        $("#adminuserform input[name='name']").attr("value",response.docs.name);
        $("#adminuserform input[name='secondname']").attr("value",response.docs.secondname);
        $("#adminuserform input[name='lastname']").attr("value",response.docs.lastname);
        $("#adminuserform input[name='pesel']").attr("value",response.docs.pesel);
        $("#adminuserform input[name='dateofbirth']").attr("value",response.docs.dateofbirth);
        $("#adminuserform").attr("action",'/api/useredit/' + response.docs.pesel);
        HideAll();
        $("#userlist").toggle("slow");
        $("#useraddform").toggle("slow");
      },
      error: function(xhRequest, ErrorText, thrownError) {
        console.log(ErrorText);
      },
    });
  });

  /*
  =============================
          USER, DOC LIST
  =============================
  */

  $("#docshow").click(function(e){
      HideAll();
      DocList(e);
  });

  $("#usershow").click(function(e){
    HideAll();
    UserList(e);
  });

  /*
  =============================
          OTHER
  =============================
  */

  $('#ponworking').click(function () {
    $("#1hours").toggle("slow");
  });

  $('#wtworking').click(function () {
    $("#2hours").toggle("slow");
  });

  $('#srworking').click(function () {
    $("#3hours").toggle("slow");
  });

  $('#czwworking').click(function () {
    $("#4hours").toggle("slow");
  });

  $('#piworking').click(function () {
    $("#5hours").toggle("slow");
  });

  $('#soworking').click(function () {
    $("#6hours").toggle("slow");
  });

  $('#niworking').click(function () {
    $("#7hours").toggle("slow");
  });

});