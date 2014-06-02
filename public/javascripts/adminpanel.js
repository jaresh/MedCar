/*jshint smarttabs:true */
/*global $:false */
/*global key:false */
// checked with jshint

$(document).ready(function() {

/*
=============================
        FUNCTIONS
=============================
*/

  function HideAll(){
    $("#docaddform").hide();
    $("#useraddform").hide();
    $("#newsaddform").hide();
    $("#doclist").hide();
    $("#userlist").hide();
    $("#newslist").hide();
  }


  function UserList(e){
    e.preventDefault();
      $.ajax({
        url: '/api/userslist',
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#usertable").empty();
          var htmltoadd = "<tr><th>Imie</th><th>Nazwisko</th><th>Pesel</th><th>Data urodzenia</th><th>Akcje</th></tr>";
          $.each(response.docs, function(key,value) {

              htmltoadd = htmltoadd +
                "<tr>"+
                  "<th>"+ value.name +"</th>"+
                  "<th>"+ value.lastname +"</th>"+
                  "<th>" + value.pesel + "</th>"+
                  "<th>" + value.dateofbirth + "</th>"+
                  "<th>  <button class='userdeletebtn' data-value="+ value.pesel + ">Usuń</button> <button class='usereditbtn' data-value="+ value.pesel + ">Edytuj</button> </th>"+
                "</tr>";

          });
        
          $("#usertable").append(htmltoadd);
          
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
          var htmltoadd ="<tr><th>Imie</th><th>Nazwisko</th> <th>Dnie pracujące</th><th>Akcje</th></tr>";
          $.each(response.docs, function(key,value) {

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
              htmltoadd = htmltoadd + 
                "<tr>"+
                  "<th>"+ value.name +"</th>"+
                  "<th>"+ value.lastname +"</th>"+
                  "<th>" + workingdays + "</th>"+
                  "<th>  <button class='docdeletebtn' data-name='"+ value.name + "' data-lastname='" + value.lastname + "'>Usuń</button> <button class='doceditbtn' data-name='"+ value.name + "' data-lastname='" + value.lastname + "'>Edytuj</button> </th>"+
                "</tr>";
          });
          
          $("#doctable").append(htmltoadd);

          HideAll();
          $("#doclist").toggle("slow");
        },
        error: function() {
          console.log("Błąd AJAX");
        },
      });
  }

  function NewsListadmin(e){
        $.ajax({
          url: '/api/newsall',
          type: 'GET',
          dataType: 'json',
          success: function(response) { 
            $("#newstable").empty();
            var htmltoadd = "<tr><th>Numer</th><th>Tytuł</th><th>Treść</th><th>Data utworzenia</th><th>Akcje</th></tr>";
            $.each(response.docs, function(key,value) {

              htmltoadd = htmltoadd +
                "<tr>"+
                  "<th>"+ value.number +"</th>"+
                  "<th>"+ value.title +"</th>"+
                  "<th>" + value.content + "</th>"+
                  "<th>" + value.date + "</th>"+
                  "<th>  <button class='newsdeletebtn' data-value="+ value.number + ">Usuń</button> <button class='newseditbtn' data-value="+ value.number + ">Edytuj</button> </th>"+
                "</tr>";

            });

            $("#newstable").append(htmltoadd);

            HideAll();
            $("#newslist").toggle("slow");
          },
          error: function() {
            console.log("Błąd AJAX");
          },
        });
  }

  HideAll();

  /*
  =============================
      NEWS ADD,EDIT,DELETE FORM
  =============================
  */

  //News add

  $("#newsadd").click(function (e) {

    $("#adminnewsform").attr("action",'/api/newsadd');
    $("#newssubmitbutton").text("Dodaj ogłoszenie");

    $("#adminnewsform input[name='title']").val("");
    $("#adminnewsform input[name='newscontent']").val("");
    e.preventDefault();
    $.ajax({
      url: '/api/newsnumber/',
      type: 'GET',
      success: function(response) { 
        $("#adminnewsform input[name='number']").val(response.number);
      },
      error: function(ErrorText) {
        console.log(ErrorText);
      },
    });

    HideAll();
    $('button[type="submit"]').attr("disabled", false);
    $("#newsaddform").toggle("slow");
  });

  //News delete

  $('body').on("click", ".newsdeletebtn", function (e){
      e.preventDefault();
      $.ajax({
        url: '/api/newsdelete/' + $(this).attr("data-value"),
        type: 'GET',
        success: function() { 
          HideAll();
          NewsListadmin(e);
        },
        error: function(ErrorText) {
          console.log(ErrorText);
        },
      });
  });

  //News edit

  $('body').on("click", ".newseditbtn", function (e){
    if($("#useraddform:visible"))
      $("#useraddform").hide();

    $("#newssubmitbutton").text("Edytuj ogłoszenie");
    e.preventDefault();
    $.ajax({
      url: '/api/newsone/' + $(this).attr("data-value"),
      type: 'GET',
      success: function(response) { 

        $("#adminnewsform input[name='number']").val(response.docs.number);
        $("#adminnewsform input[name='title']").val(response.docs.title);
        $("#adminnewsform textarea[name='newscontent']").val(response.docs.content);

        $("#adminnewsform").attr("action",'/api/newsedit/' + response.docs.number);
        $('button[type="submit"]').attr("disabled", false);

        $("#newsaddform").toggle("slow");
      },
      error: function(ErrorText) {
        console.log(ErrorText);
      },
    });
  });

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

    $("#admindocform").attr("action",'/api/docadd');
    $("#docsumbitbutton").text("Dodaj lekarza");

    $("#admindocform input[name='login']").val("");
    $("#admindocform input[name='name']").val("");
    $("#admindocform input[name='lastname']").val("");

    $('#ponworking').prop('checked', false);
    $('#admindocform input[name="ponbegin"]').val('8');
    $('#admindocform input[name="ponend"]').val('8');
    $('#wtworking').prop('checked', false);
    $('#admindocform input[name="wtbegin"]').val('8');
    $('#admindocform input[name="wtend"]').val('8');
    $('#srworking').prop('checked', false);
    $('#admindocform input[name="srbegin"]').val('8');
    $('#admindocform input[name="srend"]').val('8');
    $('#czwworking').prop('checked', false);
    $('#admindocform input[name="czwbegin"]').val('8');
    $('#admindocform input[name="czwend"]').val('8');
    $('#piworking').prop('checked', false);
    $('#admindocform input[name="pibegin"]').val('8');
    $('#admindocform input[name="piend"]').val('8');
    $('#soworking').prop('checked', false);
    $('#admindocform input[name="sobegin"]').val('8');
    $('#admindocform input[name="soend"]').val('8');
    $('#niworking').prop('checked', false);
    $('#admindocform input[name="nibegin"]').val('8');
    $('#admindocform input[name="niend"]').val('8');

    HideAll();
    $('button[type="submit"]').attr("disabled", false);
    $("#docaddform").toggle("slow");
  });

  //Doc delete

  $('body').on("click", ".docdeletebtn", function (e){
      e.preventDefault();
      $.ajax({
        url: '/api/docdelete/' + $(this).attr("data-name") + "/" + $(this).attr("data-lastname"),
        type: 'GET',
        success: function() { 
          HideAll();
          DocList(e);
        },
        error: function(ErrorText) {
          console.log(ErrorText);
        },
      });
  });

  //Doc edit

  $('body').on("click", ".doceditbtn", function (e){
    if($("#docaddform:visible"))
      $("#docaddform").hide();

    $("#docsumbitbutton").text("Edytuj lekarza");
    e.preventDefault();
    $.ajax({
      url: '/api/docone/' + $(this).attr("data-name") + '/' + $(this).attr("data-lastname"),
      type: 'GET',
      success: function(response) { 
        $("#admindocform input[name='login']").val("");
        $("#admindocform input[name='name']").val(response.docs.name);
        $("#admindocform input[name='lastname']").val(response.docs.lastname);
        if(response.docs.workingdays.pon)
        {
          $('#ponworking').prop('checked', true);
          $('#1hours').show();
          $('#admindocform input[name="ponbegin"]').val(response.docs.workinghours.ponbegin);
          $('#admindocform input[name="ponend"]').val(response.docs.workinghours.ponend);
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
          $('#admindocform input[name="wtbegin"]').val(response.docs.workinghours.wtbegin);
          $('#admindocform input[name="wtend"]').val(response.docs.workinghours.wtend);
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
          $('#admindocform input[name="srbegin"]').val(response.docs.workinghours.srbegin);
          $('#admindocform input[name="srend"]').val(response.docs.workinghours.srend);
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
          $('#admindocform input[name="czwbegin"]').val(response.docs.workinghours.czwbegin);
          $('#admindocform input[name="czwend"]').val(response.docs.workinghours.czwend);
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
          $('#admindocform input[name="pibegin"]').val(response.docs.workinghours.pibegin);
          $('#admindocform input[name="piend"]').val(response.docs.workinghours.piend);
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
          $('#admindocform input[name="sobegin"]').val(response.docs.workinghours.sobegin);
          $('#admindocform input[name="soend"]').val(response.docs.workinghours.soend);
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
          $('#admindocform input[name="nibegin"]').val(response.docs.workinghours.nibegin);
          $('#admindocform input[name="niend"]').val(response.docs.workinghours.niend);
        }
        else
        {
          $('#niworking').prop('checked', false);
          $('#7hours').hide();
        }

        $("#admindocform").attr("action",'/api/docedit/' + response.docs.name + '/' + response.docs.lastname);

        $('button[type="submit"]').attr("disabled", false);
        $("#docaddform").toggle("slow");
      },
      error: function(ErrorText) {
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
    $("#adminuserform input[name='login']").val("");
    $("#adminuserform input[name='nameuser']").val("");
    $("#adminuserform input[name='secondnameuser']").val("-");
    $("#adminuserform input[name='lastnameuser']").val("");
    $("#adminuserform input[name='pesel']").val("");
    $("#adminuserform input[name='dateofbirth']").val("");
    $('#date').datepicker({
      buttonImage: '/images/images.png',
      buttonImageOnly: true,
      showOn: "both",
      changeMonth: true, 
      changeYear: true, 
      yearRange: '1900:2014',
      monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
      'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
      monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze','Lip',
      'Sie','Wrz','Pa','Lis','Gru'],
      dayNamesShort: [ "Ni", "Pon", "Wt", "Śr", "Czw", "Pi", "So" ],
      dayNamesMin: [ "Ni", "Pon", "Wt", "Śr", "Czw", "Pi", "So" ],
      dayNames: ['Niedziela','Poniedzialek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
      maxDate: new Date(),
      onSelect: function(dateText) {
        var datetofind = dateText.split("/");
        $("#currentdate").val(datetofind[2] + "-" + datetofind[1] + "-" + datetofind[0]);
      }
    });
    HideAll();
    $("#useraddform").toggle("slow");
  });

  //User delete

  $('body').on("click", ".userdeletebtn", function (e){
      e.preventDefault();
      $.ajax({
        url: '/api/userdelete/' + $(this).attr("data-value"),
        type: 'GET',
        success: function() { 
          HideAll();
          UserList(e);
        },
        error: function(ErrorText) {
          console.log(ErrorText);
        },
      });
  });

  //User edit

  $('body').on("click", ".usereditbtn", function (e){
    if($("#useraddform:visible"))
      $("#useraddform").hide();

    $("#usersubmitbutton").text("Edytuj pacjenta");
    e.preventDefault();
    $.ajax({
      url: '/api/userone/' + $(this).attr("data-value"),
      type: 'GET',
      success: function(response) { 

        $("#adminuserform input[name='login']").val("");
        $("#adminuserform input[name='password']").val("");
        $("#adminuserform input[name='nameuser']").val(response.docs.name);
        $("#adminuserform input[name='secondnameuser']").val(response.docs.secondname);
        $("#adminuserform input[name='lastnameuser']").val(response.docs.lastname);
        $("#adminuserform input[name='pesel']").val(response.docs.pesel);
        $("#adminuserform input[name='dateofbirth']").val(response.docs.dateofbirth);
        $("#adminuserform").attr("action",'/api/useredit/' + response.docs.pesel);
        $('button[type="submit"]').attr("disabled", false);
        $('#date').datepicker({
          buttonImage: '/images/images.png',
          buttonImageOnly: true,
          showOn: "both",
          changeMonth: true, 
          changeYear: true, 
          yearRange: '1900:2014',
          monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
          'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
          monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze','Lip',
          'Sie','Wrz','Pa','Lis','Gru'],
          dayNamesShort: [ "Ni", "Pon", "Wt", "Śr", "Czw", "Pi", "So" ],
          dayNamesMin: [ "Ni", "Pon", "Wt", "Śr", "Czw", "Pi", "So" ],
          dayNames: ['Niedziela','Poniedzialek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
          maxDate: new Date(),
          onSelect: function(dateText) {
            var datetofind = dateText.split("/");
            $("#currentdate").val(datetofind[2] + "-" + datetofind[1] + "-" + datetofind[0]);
          }
        });
        $("#useraddform").toggle("slow");
      },
      error: function(ErrorText) {
        console.log(ErrorText);
      },
    });
  });

  /*
  =============================
        USER,NEWS,DOC LIST
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

  $("#newsshow").click(function(e){
    HideAll();
    NewsListadmin(e);
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