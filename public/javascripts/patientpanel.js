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
    $("#myvisits").hide();
    $("#uservisitaddform").hide();
    $("#doclist").hide();
    $("#visithours").hide();
  }

  function DocList(e){
    e.preventDefault();
      $.ajax({
        url: '/api/doclist',
        type: 'GET',
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
                  "<th>  <button class='docvisitbtn' data-name='"+ value.name + "' data-lastname='" + value.lastname + "'>Umów wizytę</button></th>"+
                "</tr>"
              );
          });
          HideAll();
          $("#doclist").toggle("slow");
        },
        error: function(ErrorText) {
          console.log(ErrorText);
        },
      });
  }


  HideAll();

  $("#visits").click(function(e){
      e.preventDefault();
      $.ajax({
        url: '/api/uservisits/' + $("#visits").attr("data-name") + '/'+ $("#visits").attr("data-lastname"),
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#uservisitstable").empty();
          $("#uservisitstable").append("<tr><th>Lekarz</th><th>Godzina</th><th>Dzień</th></tr>");
          $.each(response.visits, function(key, value) {
              $("#uservisitstable tbody").append(
                "<tr>"+
                  "<th>"+ value.doc +"</th>"+
                  "<th>"+ value.hour +"</th>"+
                  "<th>" + value.day + "</th>"+
                "</tr>"
              );
          });
          HideAll();
          $("#myvisits").toggle("slow");
        },
        error: function() {
        },
      });
  });

  $('body').on("click", ".docvisitbtn", function (e){
      $('button[type="submit"]').attr("disabled", true);
      e.preventDefault();
      $.ajax({
        url: '/api/docone/' + $(this).attr("data-name") + '/' + $(this).attr("data-lastname"),
        type: 'GET',
        success: function(response) { 

          var daysToDisable = [0,1,2,3,4,5,6];
          var index = 0;

          $('#uservisitaddform input[name="name"]').attr("value",response.docs.name);
          $('#uservisitaddform input[name="lastname"]').attr("value",response.docs.lastname);

          var ponbegin = response.docs.workinghours.ponbegin;
          var ponend = response.docs.workinghours.ponend;
          var wtbegin = response.docs.workinghours.wtbegin;
          var wtend = response.docs.workinghours.wtend;
          var srbegin = response.docs.workinghours.srbegin;
          var srend = response.docs.workinghours.srend;
          var czwbegin = response.docs.workinghours.czwbegin;
          var czwend = response.docs.workinghours.czwend;
          var pibegin = response.docs.workinghours.pibegin;
          var piend = response.docs.workinghours.piend;
          var sobegin = response.docs.workinghours.sobegin;
          var soend = response.docs.workinghours.soend;
          var nibegin = response.docs.workinghours.nibegin;
          var niend = response.docs.workinghours.niend;

          $('#date').datepicker( "destroy" );

          if(response.docs.workingdays.pon)
          {
            index = daysToDisable.indexOf(1);

            if (index > -1) {
            daysToDisable.splice(index, 1);
            }
          }

          if(response.docs.workingdays.wt)
          {
            index = daysToDisable.indexOf(2);

            if (index > -1) {
            daysToDisable.splice(index, 1);
            }
          }

          if(response.docs.workingdays.sr)
          {
            index = daysToDisable.indexOf(3);
    
            if (index > -1) {
            daysToDisable.splice(index, 1);
            }
          }

          if(response.docs.workingdays.czw)
          {
            index = daysToDisable.indexOf(4);
            
            if (index > -1) {
            daysToDisable.splice(index, 1);
            }
          }

          if(response.docs.workingdays.pi)
          {
            index = daysToDisable.indexOf(5);
            
            if (index > -1) {
            daysToDisable.splice(index, 1);
            }
          }
          if(response.docs.workingdays.so)
          {
            index = daysToDisable.indexOf(6);
            
            if (index > -1) {
            daysToDisable.splice(index, 1);
            }
          }
          if(response.docs.workingdays.ni)
          {
            index = daysToDisable.indexOf(0);
            
            if (index > -1) {
            daysToDisable.splice(index, 1);
            }
          }

          function disableSpecificWeekDays(date) {
            var day = date.getDay();
            for (var i = 0; i < daysToDisable.length; i++) {
              if ($.inArray(day, daysToDisable) != -1) {
                   return [false];
              }
            }
            return [true];
          }

          $('#date').datepicker({
            beforeShowDay: disableSpecificWeekDays,
            buttonImage: '/images/images.png',
            buttonImageOnly: true,
            showOn: "both",
            monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
            'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
            monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze','Lip',
            'Sie','Wrz','Pa','Lis','Gru'],
            dayNamesShort: [ "Ni", "Pon", "Wt", "Śr", "Czw", "Pi", "So" ],
            dayNamesMin: [ "Ni", "Pon", "Wt", "Śr", "Czw", "Pi", "So" ],
            dayNames: ['Niedziela','Poniedzialek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
            minDate: 0,
            onSelect: function(dateText) {
              var datetofind = dateText.split("/");

              if($("#visithours:visible"))
              $("#visithours").hide();

              $("#visithour").empty();

              $("#currentdate").attr("value",datetofind[2] + "-" + datetofind[1] + "-" + datetofind[0]);

              $.ajax({
                url: '/api/getvisitbydate/' + response.docs.name + "/" + response.docs.lastname + "/" + datetofind[2] + "-" + datetofind[1] + "-" + datetofind[0],
                type: 'GET',
                dataType: 'json',
                success: function(response) { 

                  var hourstodelete = [];
                  var dochoursbegin = "";
                  var dochoursend = "";

                  if(response.visits)
                  {
                    $.each(response.visits, function(key, value) {
                      hourstodelete.push(value.hour);
                    });
                  }

                  var currentdate = $('#date').datepicker('getDate');
                  var dayOfWeek = currentdate.getUTCDay();

                  if(dayOfWeek == 0)
                  {
                    var dochoursbegin = ponbegin;
                    var dochoursend = ponend;
                  }
                  if(dayOfWeek == 1)
                  {
                    var dochoursbegin = wtbegin;
                    var dochoursend = wtend;
                  }
                  if(dayOfWeek == 2)
                  {
                    var dochoursbegin = srbegin;
                    var dochoursend = srend;
                  }
                  if(dayOfWeek == 3)
                  {
                    var dochoursbegin = czwbegin;
                    var dochoursend = czwend;
                  }
                  if(dayOfWeek == 4)
                  {
                    var dochoursbegin = pibegin;
                    var dochoursend = piend;
                  }
                  if(dayOfWeek == 5)
                  {
                    var dochoursbegin = sobegin;
                    var dochoursend = soend;
                  }
                  if(dayOfWeek == 6)
                  {
                    var dochoursbegin = nibegin;
                    var dochoursend = niend;
                  }

                  $("#visithour").append("<option value='-'>-</option>");

                  for(var i = dochoursbegin; i < dochoursend; i++)
                  {
                    $("#visithour").append("<option value='" + i + ':' + '00' + "'>" + i + ':' + '00' + "</option>");
                    $("#visithour").append("<option value='" + i + ':' + '10' + "'>" + i + ':' + '10' + "</option>");
                    $("#visithour").append("<option value='" + i + ':' + '20' + "'>" + i + ':' + '20' + "</option>");
                    $("#visithour").append("<option value='" + i + ':' + '30' + "'>" + i + ':' + '30' + "</option>");
                    $("#visithour").append("<option value='" + i + ':' + '40' + "'>" + i + ':' + '40' + "</option>");
                    $("#visithour").append("<option value='" + i + ':' + '50' + "'>" + i + ':' + '50' + "</option>");
                  }

                  if(hourstodelete)
                  {
                    $.each(hourstodelete, function(key, value) {
                      $('option[value="'+ value +'"]').remove();
                    });
                  }

                  $("#visithours").toggle("slow");

                },
                error: function() {
                  console.log("Błąd AJAX");
                },
              });
            }
          });

          $("#uservisitaddform").hide();

          $("#uservisitaddform").toggle("slow");
        },
        error: function(ErrorText) {
          console.log(ErrorText);
        },
      });
  });

  $('#visithour').bind('change', function () {
          
      $('button[type="submit"]').attr("disabled", false);

  });

  $("#docshow").click(function(e){
    HideAll();
    DocList(e);
  });



});