/*jshint smarttabs:true */
/*global $:false */
/*global key:false */
// checked with jshint
setInterval(function(){
  var today = new Date();

      $.ajax({
        url: '/api/uservisits/' + $("#visitshistory").attr("data-name") + '/'+ $("#visitshistory").attr("data-lastname"),
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#uservisitstable").empty();
          var htmltoadd = "<tr><th>Lekarz</th><th>Godzina</th><th>Dzień</th><th>Akcje</th></tr>";
          $.each(response.visits, function(key, value) {

              var todaycompare  = new Date(value.day);

              if(today < todaycompare)
                htmltoadd = htmltoadd + "<tr>"+"<th>"+ value.doc +"</th>"+"<th>"+ value.hour +"</th>"+"<th>" + 
                value.day + "</th>"+"<th><button class='visitdeletebtn' data-doc='"+ 
                value.doc + "' data-patient='" + value.patient + "' data-day='" + value.day + "' data-hour='" + value.hour + "'>Odmów wizytę</button></th>"+"</tr>";
          });

          $("#uservisitstable").append(htmltoadd);
          
        },
        error: function() {
        },
      });
}, 5000);

$(document).ready(function() {

/*
=============================
        FUNCTIONS
=============================
*/

function HideAll(){
    $(document.getElementById("myvisitshistory")).hide();
    $(document.getElementById("myvisits")).hide();
    $(document.getElementById("uservisitaddform")).hide();
    $(document.getElementById("doclist")).hide();
    $(document.getElementById("visithours")).hide();
  }

// Hours selector validation

  $('#uservisitaddform').on('change','select[name="visithour"]', function() {
      if($(this).val() == "-")
        $('button[type="submit"]').attr("disabled", true);
      else
        $('button[type="submit"]').attr("disabled", false);

  });

  function DocList(e){
    e.preventDefault();
      $.ajax({
        url: '/api/doclist',
        type: 'GET',
        success: function(response) { 
          $("#doctable").empty();
          var htmltoadd = "<tr><th>Imie</th><th>Nazwisko</th> <th>Dnie pracujące</th><th>Akcje</th></tr>";
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
              htmltoadd = htmltoadd + 
                "<tr>"+
                  "<th>"+ value.name +"</th>"+
                  "<th>"+ value.lastname +"</th>"+
                  "<th>" + workingdays + "</th>"+
                  "<th>  <button class='docvisitbtn' data-name='"+ value.name + "' data-lastname='" + value.lastname + "'>Umów wizytę</button></th>"+
                "</tr>";
          });

          $("#doctable").append(htmltoadd);
          HideAll();
          $(document.getElementById("doclist")).toggle("slow");
        },
        error: function(ErrorText) {
          console.log(ErrorText);
        },
      });
  }

//=========================
// ====== USER VISITS
//=========================


  HideAll();

  $("#visits").click(function(e){

    HideAll();
    $(document.getElementById("myvisits")).toggle("slow");
      
  });

//=========================
// ====== USER VISIT History
//=========================

  $("#visitshistory").click(function(e){
      e.preventDefault();
      
      var today = new Date();

      $.ajax({
        url: '/api/uservisits/' + $("#visitshistory").attr("data-name") + '/'+ $("#visitshistory").attr("data-lastname"),
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#uservisitshistorytable").empty();
          var htmltoadd = "<tr><th>Lekarz</th><th>Godzina</th><th>Dzień</th></tr>";
          $.each(response.visits, function(key, value) {

              var todaycompare = new Date(value.day);

              if(today >= todaycompare)
              htmltoadd = htmltoadd + "<tr>"+"<th>"+ value.doc +"</th>"+"<th>"+ value.hour +"</th>"+"<th>" + value.day + "</th>"+"</tr>";
          });

          $("#uservisitshistorytable").append(htmltoadd);
          HideAll();
          $(document.getElementById("myvisitshistory")).toggle("slow");
        },
        error: function() {
        },
      });
  });

//=========================
// ======== USER DELETE VISIT
//=========================

  $('body').on("click", ".visitdeletebtn", function (e){
    if (confirm("Jesteś pewny?")) {
      e.preventDefault();
      $.ajax({
        url: '/api/visitdelete/' + $(this).attr("data-doc") + "/" + $(this).attr("data-patient") + "/" + $(this).attr("data-day") + "/" + $(this).attr("data-hour"),
        type: 'GET',
        success: function() { 
          HideAll();
          $(document.getElementById("myvisits")).toggle("slow");
        },
        error: function(ErrorText) {
          console.log(ErrorText);
        },
      });
    }
    return false;
  });

//=========================
// ======== USER ADD VISIT
//=========================

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
            minDate: 1,
            onSelect: function(dateText) {
              var datetofind = dateText.split("/");

              if($("#visithours:visible"))
              $("#visithours").hide();

              $("#visithour").empty();

              $("#currentdate").attr("value",datetofind[2] + "-" + datetofind[0] + "-" + datetofind[1]);

              $.ajax({
                url: '/api/getvisitbydate/' + response.docs.name + "/" + response.docs.lastname + "/" + datetofind[2] + "-" + datetofind[0] + "-" + datetofind[1],
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
                  
                  switch(dayOfWeek) {
                    case 0:
                      dochoursbegin = ponbegin;
                      dochoursend = ponend;
                      break;
                    case 1:
                      dochoursbegin = wtbegin;
                      dochoursend = wtend;
                      break;
                    case 2:
                      dochoursbegin = srbegin;
                      dochoursend = srend;
                      break;
                    case 3:
                      dochoursbegin = czwbegin;
                      dochoursend = czwend;
                      break;
                    case 4:
                      dochoursbegin = pibegin;
                      dochoursend = piend;
                      break;
                    case 5:
                      dochoursbegin = sobegin;
                      dochoursend = soend;
                      break;
                     case 6:
                      dochoursbegin = nibegin;
                      dochoursend = niend;
                      break;   
                  }
                  
                  var htmltoadd = "<option value='-'>-</option>";

                  for(var i = dochoursbegin; i < dochoursend; i++)
                  {
                    htmltoadd = htmltoadd + 
                    "<option value='" + i + ':' + '00' + "'>" + i + ':' + '00' + "</option>"+
                    "<option value='" + i + ':' + '15' + "'>" + i + ':' + '15' + "</option>"+
                    "<option value='" + i + ':' + '30' + "'>" + i + ':' + '30' + "</option>"+
                    "<option value='" + i + ':' + '45' + "'>" + i + ':' + '45' + "</option>";
                  }

                  $("#visithour").append(htmltoadd);

                  if(hourstodelete)
                  {
                    $.each(hourstodelete, function(key, value) {
                      $('option[value="'+ value +'"]').remove();
                    });
                  }

                  $(document.getElementById("visithours")).toggle("slow");

                },
                error: function() {
                  console.log("Błąd AJAX");
                },
              });
            }
          });

          $(document.getElementById("uservisitaddform")).hide();

          $(document.getElementById("uservisitaddform")).toggle("slow");
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