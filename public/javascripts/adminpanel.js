/*jshint smarttabs:true */
/*global $:false */
/*global key:false */
// checked with jshint

/*
=============================
        VALIDATORS
=============================
*/

$(document).ready(function() {

    $('#formcontener').on('click','#newspreviewbutton',function () {
      
      $("#newspreview").toggle("slow");
      
    });

    $("#newspreviewhide").click(function () {
      
      $("#newspreview").toggle("slow");
      
    });

   $('#formcontener').on('keyup change','input[name="login"]', function() {
        StringValidate($(this).val(),"#loginerror");
    });

     $('#formcontener').on('keyup change','input[name="password"]', function() {
        StringValidate($(this).val(),"#passworderror");
    });

     $('#formcontener').on('keyup change','input[name="name"]', function() {
        StringValidate($(this).val(),"#nameerror");
    });

     $('#formcontener').on('keyup change','input[name="lastname"]', function() {
        StringValidate($(this).val(),"#lastnameerror");
    });

    $('#formcontener').on('keyup change','input[name="secondname"]', function() {
        SecondnameValidate($(this).val(),"#secondnameerror");
    });

     $('#formcontener').on('keyup change','input[name="pesel"]', function() {
        PeselValidate($(this).val(),"#peselerror");
    });

     $('#formcontener').on('keyup change','input[name="title"]', function() {
        TitleValidate($(this).val(),"#titleerror");
    });

    function ValidateAll(){
  
    if($("div[data-status='error']").text() !== ""){
      $('button[type="submit"]').attr("disabled", true);
    }
    else{
      $('button[type="submit"]').attr("disabled", false);
    }
  }

  function StringValidate(str,errorel){

        console.log(errorel);

        if(str.match(/[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0123456789]+/))
        {
            $(errorel).text("Nieprawidłowy znak.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else if(str == "" && ($('button[type="submit"]').text() == "Dodaj pacjenta" || 
         $('button[type="submit"]').text() == "Dodaj lekarza" 
         || $('button[type="submit"]').text() == "Dodaj ogłoszenie"))
        {   $(errorel).text("Pole nie może być puste.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else
        {
              if(errorel == "#loginerror")
              {
                  console.log("Jestem tutaj");
                  $.ajax({
                    url: '/api/findlogin/' + str,
                    type: 'GET',
                    success: function(response) { 
                      if(response.findlogin)
                      {
                        $(errorel).text("Podany login juz istnieje.");
                        $(errorel).attr("data-status","error");
                        $(errorel).prev().css("background-color","rgb(245, 76, 76)");
                      }
                      else
                      {  
                        $(errorel).attr("data-status","good");
                        $(errorel).prev().css("background-color","white");
                        $(errorel).text("");
                      }
                      ValidateAll();
                    },
                    error: function(ErrorText) {
                      console.log(ErrorText);
                    },
                  });
              }

            $(errorel).attr("data-status","good");
            $(errorel).prev().css("background-color","white");
            $(errorel).text("");
        }
        ValidateAll();
  }

  function PeselValidate(str,errorel){

        if(str.match(/(\D|.{12,})/) || str.length != 11)
        {
            $(errorel).text("Pesel musi zawierać 11 cyfr.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else if(str == "" && ($('button[type="submit"]').text() == "Dodaj pacjenta" || 
         $('button[type="submit"]').text() == "Dodaj lekarza" 
         || $('button[type="submit"]').text() == "Dodaj ogłoszenie"))
        {   $(errorel).text("Pole nie może być puste.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else
        {
            var peselnow = $('#formcontener form').attr("action").split("/");

            $.ajax({
                url: '/api/userone/' + str,
                type: 'GET',
                success: function(response) { 
                    if(response.docs && peselnow[3] != str)
                    {
                        $(errorel).text("Podany pesel juz istnieje.");
                        $(errorel).attr("data-status","error");
                        $(errorel).prev().css("background-color","rgb(245, 76, 76)");
                    }
                    else
                    {  
                        $(errorel).attr("data-status","good");
                        $(errorel).prev().css("background-color","white");
                        $(errorel).text("");
                    }
                    ValidateAll();
                },
                error: function(ErrorText) {
                    console.log(ErrorText);
                },
            });        
        }
        ValidateAll();
  }

  function SecondnameValidate(str,errorel){
    if(str.match(/[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0123456789]+/) && str!="-")
        {
            $(errorel).text("Neprawidłowy znak. Jeżeli nie dotyczy wpisz '-'.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else if(str == "" && ($('button[type="submit"]').text() == "Dodaj pacjenta" || 
         $('button[type="submit"]').text() == "Dodaj lekarza" 
         || $('button[type="submit"]').text() == "Dodaj ogłoszenie"))
        {   $(errorel).text("Pole nie może być puste. Jeżeli nie dotyczy wpisz '-'.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else
        {
            $(errorel).attr("data-status","good");
            $(errorel).prev().css("background-color","white");
            $(errorel).text("");
        }
        ValidateAll();
  }

    function TitleValidate(str,errorel){
        if(str.match(/[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0123456789\s]+/) && str!="-")
        {
            $(errorel).text("Neprawidłowy znak.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else if(str == "" && ($('button[type="submit"]').text() == "Dodaj pacjenta" || 
         $('button[type="submit"]').text() == "Dodaj lekarza" 
         || $('button[type="submit"]').text() == "Dodaj ogłoszenie"))
        {   $(errorel).text("Pole nie może być puste.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else
        {
            $(errorel).attr("data-status","good");
            $(errorel).prev().css("background-color","white");
            $(errorel).text("");
        }
        ValidateAll();
    }

/*
=============================
        FUNCTIONS
=============================
*/

  function HideAll(){
    $(document.getElementById("formcontener")).hide();
    $(document.getElementById("doclist")).hide();
    $(document.getElementById("userlist")).hide();
    $(document.getElementById("newslist")).hide();
    $(document.getElementById("newspreview")).hide();
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
          $(document.getElementById("userlist")).toggle("slow");
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
          $(document.getElementById("doclist")).toggle("slow");
        },
        error: function() {
          console.log("Błąd AJAX");
        },
      });
  }

  function NewsListadmin(e){
        e.preventDefault();
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
            $(document.getElementById("newslist")).toggle("slow");
          },
          error: function() {
            console.log("Błąd AJAX");
          },
        });
  }

  HideAll();

  /*
  ========================================
      NEWS ADD,EDIT,DELETE,PREVIEW FORM
  ========================================
  */

  $('#formcontener').on('keyup change','input[name="title"]', function() {
        $("#previewtext").empty();
        document.getElementById('previewtext').innerHTML =  "<h2>" + $('input[name="title"]').val() + "</h2>"+
        $('textarea[name="newscontent"]').val();
  });

  $('#formcontener').on('keyup change','textarea[name="newscontent"]', function() {
        $("#previewtext").empty();
        document.getElementById('previewtext').innerHTML =  "<h2>" + $('input[name="title"]').val() + "</h2>"+
        $('textarea[name="newscontent"]').val();
  });

  //News add

  $("#newsadd").click(function (e) {

    e.preventDefault();
    $.ajax({
      url: '/api/newsnumber/',
      type: 'GET',
      success: function(response) { 
        document.getElementById("formcontener").innerHTML = 
        '<h2> Formularz ogłoszeń </h2>'+
      '<form action="/api/newsadd" method="post">'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 51px;">Numer ogłoszenia</label>'+
          '<input type="text" name="number" value="' + response.number + '" style="background-color:#CACACA;" readonly>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 53px;">Tytuł</label>'+
          '<input type="text" name="title" value="">'+
          '<div id="titleerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 51px;">Treść</label>'+
        '<textarea name="newscontent" rows="10" cols="80"></textarea>'+
        '</div>'+
        '<button id="newssubmitbutton" type="submit" disabled>Dodaj ogłoszenie</button>'+
      '</form>'+
      '<button id="newspreviewbutton">Podgląd</button>';
          TitleValidate("","#titleerror");
      },
      error: function(ErrorText) {
        console.log(ErrorText);
      },
    });

    $(document.getElementById("formcontener")).css("width","800px");

    HideAll();
    $(document.getElementById("formcontener")).toggle("slow");
  });

  //News delete

  $('body').on("click", ".newsdeletebtn", function (e){
    if (confirm("Jesteś pewny?")) {
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
    }
    return false;
  });

  //News edit

  $('body').on("click", ".newseditbtn", function (e){
    if($("#useraddform:visible"))
      $(document.getElementById("useraddform")).hide();

    $("#newssubmitbutton").text("Edytuj ogłoszenie");
    e.preventDefault();
    $.ajax({
      url: '/api/newsone/' + $(this).attr("data-value"),
      type: 'GET',
      success: function(response) { 

        document.getElementById("formcontener").innerHTML = 
        '<h2> Formularz ogłoszeń </h2>'+
      '<form action="/api/newsedit/'+ response.docs.number +'" method="post">'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 51px;">Numer ogłoszenia</label>'+
          '<input type="text" name="number" value="' + response.docs.number + '" style="background-color:#CACACA;" readonly>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 53px;">Tytuł</label>'+
          '<input type="text" name="title" value="'+ response.docs.title +'">'+
          '<div id="titleerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 51px;">Treść</label>'+
        '<textarea name="newscontent" rows="10" cols="80"></textarea>'+
        '</div>'+
        '<button id="newssubmitbutton" type="submit" disabled>Edytuj ogłoszenie</button>'+
      '</form>'+
      '<button id="newspreviewbutton">Podgląd</button>';

        $('button[type="submit"]').attr("disabled", false);

        $('textarea[name="newscontent"]').val(response.docs.content);

        $('#previewtext').append(response.docs.content);

        $(document.getElementById("formcontener")).css("width","800px");

        $(document.getElementById("formcontener")).toggle("slow");
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

     document.getElementById("formcontener").innerHTML = 

    '<form action="/api/docadd" method="post">'+

        '<h2> Formularz lekarza </h2>'+
        '<div style="margin-bottom:20px;">'+
          '<label>Login do panelu</label>'+
          '<input type="text" name="login">'+
          '<div id="loginerror" data-status="good"></div>'+
        '</div>'+
       '<div style="margin-bottom:20px;">'+
          '<label>Hasło do panelu</label>'+
          '<input type="password" name="password">'+
          '<div id="passworderror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 91px;">Imię</label>'+
          '<input type="text" name="name">'+
          '<div id="nameerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 50px;">Nazwisko</label>'+
          '<input type="text" name="lastname">'+
          '<div id="lastnameerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label>Wybierz dni pracujące</label>'+
          '<br>'+
          '<input type="checkbox" name="pon" id="ponworking" value="1">Poniedziałek<br>'+
           '<div id="1hours">'+
            '<input type="number" name="ponbegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="ponend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="wt" id="wtworking" value="2">Wtorek<br>'+
          '<div id="2hours">'+
            '<input type="number" name="wtbegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="wtend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="sr" id="srworking" value="3">Środa<br>'+
          '<div id="3hours">'+
            '<input type="number" name="srbegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="srend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="czw" id="czwworking" value="4">Czwartek<br>'+
          '<div id="4hours">'+
            '<input type="number" name="czwbegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="czwend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="pi" id="piworking" value="5">Piątek<br>'+
           '<div id="5hours">'+
            '<input type="number" name="pibegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="piend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="so" id="soworking" value="6">Sobota<br>'+
          '<div id="6hours">'+
            '<input type="number" name="sobegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="soend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="ni" id="niworking" value="7">Niedziela<br>'+
          '<div id="7hours">'+
            '<input type="number" name="nibegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="niend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
        '</div>'+

        '</div>'+

        '<button id="docsumbitbutton" type="submit" disabled>Dodaj lekarza</button>'+

      '</form>';

    for(var i = 1 ; i < 8; i++){
      $(document.getElementById(i + "hours")).hide();
    }

    $('#docsumbitbutton').attr("disabled", true);

    $(document.getElementById("formcontener")).css("width","400px");
    StringValidate("","#loginerror");
    StringValidate("","#passworderror");
    StringValidate("","#nameerror");
    StringValidate("","#lastnameerror");

    HideAll();
    $(document.getElementById("formcontener")).toggle("slow");
  });

  //Doc delete

  $('body').on("click", ".docdeletebtn", function (e){
    if (confirm("Jesteś pewny?")) {
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
    }
    return false;
  });

  //Doc edit

  $('body').on("click", ".doceditbtn", function (e){
    if($("#docaddform:visible"))
      $(document.getElementById("docaddform")).hide();

    $("#docsumbitbutton").text("Edytuj lekarza");
    e.preventDefault();
    $.ajax({
      url: '/api/docone/' + $(this).attr("data-name") + '/' + $(this).attr("data-lastname"),
      type: 'GET',
      success: function(response) { 

        document.getElementById("formcontener").innerHTML = 

    '<form action="/api/docedit/' + response.docs.name + '/' + response.docs.lastname + '" method="post">'+

        '<h2> Formularz lekarza </h2>'+
        '<div style="margin-bottom:20px;">'+
          '<label>Login do panelu</label>'+
          '<input type="text" name="login">'+
          '<div id="loginerror" data-status="good"></div>'+
        '</div>'+
       '<div style="margin-bottom:20px;">'+
          '<label>Hasło do panelu</label>'+
          '<input type="password" name="password">'+
          '<div id="passworderror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 91px;">Imię</label>'+
          '<input type="text" name="name" value="'+ response.docs.name +'">'+
          '<div id="nameerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 50px;">Nazwisko</label>'+
          '<input type="text" name="lastname" value="'+ response.docs.lastname +'">'+
          '<div id="lastnameerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label>Wybierz dni pracujące</label>'+
          '<br>'+
          '<input type="checkbox" name="pon" id="ponworking" value="1">Poniedziałek<br>'+
           '<div id="1hours">'+
            '<input type="number" name="ponbegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="ponend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="wt" id="wtworking" value="2">Wtorek<br>'+
          '<div id="2hours">'+
            '<input type="number" name="wtbegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="wtend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="sr" id="srworking" value="3">Środa<br>'+
          '<div id="3hours">'+
            '<input type="number" name="srbegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="srend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="czw" id="czwworking" value="4">Czwartek<br>'+
          '<div id="4hours">'+
            '<input type="number" name="czwbegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="czwend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="pi" id="piworking" value="5">Piątek<br>'+
           '<div id="5hours">'+
            '<input type="number" name="pibegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="piend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="so" id="soworking" value="6">Sobota<br>'+
          '<div id="6hours">'+
            '<input type="number" name="sobegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="soend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
          '<input type="checkbox" name="ni" id="niworking" value="7">Niedziela<br>'+
          '<div id="7hours">'+
            '<input type="number" name="nibegin" value="8" min="8" max="20">Początek pracy<br>'+
            '<input type="number" name="niend" value="8" min="8" max="20">Koniec pracy<br>'+
          '</div>'+
        '</div>'+

        '<button id="docsumbitbutton" type="submit" disabled>Edytuj lekarza</button>'+

      '</form>';

      if(response.docs.workingdays.pon)
        {
          $('#ponworking').prop('checked', true);
          $(document.getElementById("1hours")).show();
          $('input[name="ponbegin"]').val(response.docs.workinghours.ponbegin);
          $('input[name="ponend"]').val(response.docs.workinghours.ponend);
        }
        else
        {
          $('#ponworking').prop('checked', false);
          $(document.getElementById("1hours")).hide();
        }
        if(response.docs.workingdays.wt)
        {
          $('#wtworking').prop('checked', true);
          $(document.getElementById("2hours")).show();
          $('input[name="wtbegin"]').val(response.docs.workinghours.wtbegin);
          $('input[name="wtend"]').val(response.docs.workinghours.wtend);
        }
        else
        {
          $('#wtworking').prop('checked', false);
          $(document.getElementById("2hours")).hide();
        }
        if(response.docs.workingdays.sr)
        {
          $('#srworking').prop('checked', true);
          $(document.getElementById("3hours")).show();
          $('input[name="srbegin"]').val(response.docs.workinghours.srbegin);
          $('input[name="srend"]').val(response.docs.workinghours.srend);
        }
        else
        {
          $('#srworking').prop('checked', false);
          $(document.getElementById("3hours")).hide();
        }
        if(response.docs.workingdays.czw)
        {
          $('#czwworking').prop('checked', true);
          $(document.getElementById("4hours")).show();
          $('input[name="czwbegin"]').val(response.docs.workinghours.czwbegin);
          $('input[name="czwend"]').val(response.docs.workinghours.czwend);
        }
        else
        {
          $('#czwworking').prop('checked', false);
          $(document.getElementById("4hours")).hide();
        }
        if(response.docs.workingdays.pi)
        {
          $('#piworking').prop('checked', true);
          $(document.getElementById("5hours")).show();
          $('input[name="pibegin"]').val(response.docs.workinghours.pibegin);
          $('input[name="piend"]').val(response.docs.workinghours.piend);
        }
        else
        {
          $('#piworking').prop('checked', false);
          $(document.getElementById("5hours")).hide();
        }
        if(response.docs.workingdays.so)
        {
          $('#soworking').prop('checked', true);
          $(document.getElementById("6hours")).show();
          $('input[name="sobegin"]').val(response.docs.workinghours.sobegin);
          $('input[name="soend"]').val(response.docs.workinghours.soend);
        }
        else
        {
          $('#soworking').prop('checked', false);
          $(document.getElementById("6hours")).hide();
        }
        if(response.docs.workingdays.ni)
        {
          $('#niworking').prop('checked', true);
          $(document.getElementById("7hours")).show();
          $('input[name="nibegin"]').val(response.docs.workinghours.nibegin);
          $('input[name="niend"]').val(response.docs.workinghours.niend);
        }
        else
        {
          $('#niworking').prop('checked', false);
          $(document.getElementById("7hours")).hide();
        }

        $(document.getElementById("formcontener")).css("width","400px");
        $('button[type="submit"]').attr("disabled", false);
        $(document.getElementById("formcontener")).toggle("slow");
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

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd='0'+dd
    } 

    if(mm<10) {
      mm='0'+mm
    } 

    today = yyyy + '-' + mm + '-' + dd;

    document.getElementById("formcontener").innerHTML = 
    '<h2> Formularz pacjenta </h2>'+
      '<form action="/api/useradd" method="post">'+

        '<div style="margin-bottom:20px;">'+
          '<label>Login do panelu</label>'+
          '<input type="text" name="login" value="">'+
          '<div id="loginerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label>Hasło do panelu</label>'+
          '<input type="password" name="password" value="">'+
          '<div id="passworderror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 90px;">Imię</label>'+
          '<input type="text" name="name" value="">'+
          '<div id="nameerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 38px;">Drugie imię</label>'+
          '<input type="text" name="secondname" value="-">'+
          '<div id="secondnameerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 50px;">Nazwisko</label>'+
          '<input type="text" name="lastname" value="">'+
          '<div id="lastnameerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 80px;">Pesel</label>'+
          '<input type="text" name="pesel" value="">'+
          '<div id="peselerror" data-status="good"></div>'+
        '</div>'+
        '<div id="visitdate" style="margin-top: 20px; margin-bottom:20px;">'+
          '<label style="margin-right: 51px;">Data</label>'+
          '<input type="hidden" id="date">'+
          '<input type="text" id="currentdate" name="dateofbirth" value="'+ today +'" style="background-color:#CACACA;" readonly>'+
        '</div>'+
        

        '<button id="usersubmitbutton" type="submit" disabled>Dodaj pacjenta</button>'+

      '</form>';

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

    $(document.getElementById("formcontener")).css("width","400px");
    StringValidate("","#loginerror");
    StringValidate("","#passworderror");
    StringValidate("","#nameerror");
    StringValidate("","#lastnameerror");
    PeselValidate("","#peselerror");

    HideAll();
    $(document.getElementById("formcontener")).toggle("slow");
  });

  //User delete

  $('body').on("click", ".userdeletebtn", function (e){
    if (confirm("Jesteś pewny?")) {
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
    }
    return false;
  });

  //User edit

  $('body').on("click", ".usereditbtn", function (e){
    if($("#useraddform:visible"))
      $(document.getElementById("useraddform")).hide();

    $("#usersubmitbutton").text("Edytuj pacjenta");
    e.preventDefault();
    $.ajax({
      url: '/api/userone/' + $(this).attr("data-value"),
      type: 'GET',
      success: function(response) { 

        document.getElementById("formcontener").innerHTML = 
    '<h2> Formularz pacjenta </h2>'+
      '<form action="/api/useredit/' + response.docs.pesel + '" method="post">'+

        '<div style="margin-bottom:20px;">'+
          '<label>Login do panelu</label>'+
          '<input type="text" name="login">'+
          '<div id="loginerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label>Hasło do panelu</label>'+
          '<input type="password" name="password">'+
          '<div id="passworderror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 90px;">Imię</label>'+
          '<input type="text" name="name" value="'+response.docs.name+'">'+
          '<div id="nameerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 38px;">Drugie imię</label>'+
          '<input type="text" name="secondname" value="'+response.docs.secondname+'">'+
          '<div id="secondnameerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 50px;">Nazwisko</label>'+
          '<input type="text" name="lastname" value="'+response.docs.lastname+'">'+
          '<div id="lastnameerror" data-status="good"></div>'+
        '</div>'+
        '<div style="margin-bottom:20px;">'+
          '<label style="margin-right: 80px;">Pesel</label>'+
          '<input type="text" name="pesel" value="'+response.docs.pesel+'">'+
          '<div id="peselerror" data-status="good"></div>'+
        '</div>'+
        '<div id="visitdate" style="margin-top: 20px; margin-bottom:20px;">'+
          '<label style="margin-right: 51px;">Data</label>'+
          '<input type="hidden" id="date">'+
          '<input type="text" id="currentdate" name="dateofbirth" value="'+response.docs.dateofbirth+'" style="background-color:#CACACA;" readonly>'+
        '</div>'+
        

        '<button id="usersubmitbutton" type="submit" disabled>Edytuj pacjenta</button>'+

      '</form>';


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

        $('button[type="submit"]').attr("disabled", false);
        $(document.getElementById("formcontener")).css("width","400px");
        $(document.getElementById("formcontener")).toggle("slow");
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

  $('#formcontener').on('click','#ponworking',function () {
    $(document.getElementById("1hours")).toggle("slow");
   // $(this).next().toggle();
  });

  $('#formcontener').on('click','#wtworking',function () {
    $(document.getElementById("2hours")).toggle("slow");
  });

  $('#formcontener').on('click','#srworking',function () {
    $(document.getElementById("3hours")).toggle("slow");
  });

  $('#formcontener').on('click','#czwworking',function () {
    $(document.getElementById("4hours")).toggle("slow");
  });

  $('#formcontener').on('click','#piworking',function () {
    $(document.getElementById("5hours")).toggle("slow");
  });

  $('#formcontener').on('click','#soworking',function () {
    $(document.getElementById("6hours")).toggle("slow");
  });

  $('#formcontener').on('click','#niworking',function () {
    $(document.getElementById("7hours")).toggle("slow");
  });

});