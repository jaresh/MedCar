/*jshint smarttabs:true */
/*global $:false */
/*global key:false */
// checked with jshint
setInterval(function(){
      var today = new Date();
      console.log("Pobieram dane");
      $.ajax({
        url: '/api/docvisits/' + $("#visits").attr("data-name") + '/'+ $("#visits").attr("data-lastname"),
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#docvisitstable").empty();
          var htmltoadd = "<tr><th>Pacjent</th><th>Godzina</th><th>Dzień</th><th>Akcje</th></tr>";
          $.each(response.visits, function(key, value) {


              var todaycompare  = new Date(value.day);

              if(today <= todaycompare)
              htmltoadd = htmltoadd +
                "<tr>"+
                  "<th>"+ value.patient +"</th>"+
                  "<th>"+ value.hour +"</th>"+
                  "<th>" + value.day + "</th>"+
                  "<th>  <button class='userinfo' data-value='"+ value.patient + "'>Szczegółowe dane pacjenta</button></th>"+
                "</tr>";
          });

          $("#docvisitstable").append(htmltoadd);
        },
        error: function() {
        },
      });
}, 5000);


$(document).ready(function() {

  function HideAll(){
    $("#myvisits").hide();
    $("#myvisitshistory").hide();
    $("#userinfocontener").hide();
  }

  $("#infohide").click(function () {
      
      $("#userinfocontener").toggle("slow");
      
  });

  HideAll();

//===============
// DOC VISITS
//===============

  $("#visits").click(function(e){

                HideAll();
          $("#myvisits").toggle("slow");
  });

//===================
// DOC VISITS HISTORY
//===================

 $("#visitshistory").click(function(e){

      var today = new Date();
      e.preventDefault();
      $.ajax({
        url: '/api/docvisits/' + $("#visits").attr("data-name") + '/'+ $("#visits").attr("data-lastname"),
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#docvisitshistorytable").empty();
          var htmltoadd = "<tr><th>Pacjent</th><th>Godzina</th><th>Dzień</th><th>Akcje</th></tr>";
          $.each(response.visits, function(key, value) {


              var todaycompare  = new Date(value.day);

              if(today > todaycompare)
              htmltoadd = htmltoadd +
                "<tr>"+
                  "<th>"+ value.patient +"</th>"+
                  "<th>"+ value.hour +"</th>"+
                  "<th>" + value.day + "</th>"+
                  "<th>  <button class='userinfo' data-value='"+ value.patient + "'>Szczegółowe dane pacjenta</button></th>"+
                "</tr>";
          });

          $("#docvisitshistorytable").append(htmltoadd);
          HideAll();
          $("#myvisitshistory").toggle("slow");
        },
        error: function() {
        },
      });
  });

//===============
// USER INFO
//===============

 $('body').on("click", ".userinfo", function (e){
      e.preventDefault();
      $.ajax({
        url: '/api/useronebyname/' + $(".userinfo").attr("data-value"),
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#infotext").empty();
          $("#infotext").append(
         "<p><strong>Imię</strong>: " + response.docs.name + "<br>"+
          "<strong>Drugie imię</strong>: " + response.docs.secondname + "<br>"+
          "<strong>Nazwisko</strong>: " + response.docs.lastname + "<br>"+
          "<strong>Pesel</strong>: " + response.docs.pesel + "<br>"+
          "<strong>Data urodzenia</strong>: "+ response.docs.dateofbirth + "<br>"+
          "</p>");

          $("#userinfocontener").toggle("slow");
        },
        error: function() {
        },
      });
  });
  
});