/*jshint smarttabs:true */
/*global $:false */
/*global key:false */
// checked with jshint
$(document).ready(function() {

  function HideAll(){
    $("#myvisits").hide();
    $("#userinfocontener").hide();
  }

  HideAll();

  $("#visits").click(function(e){
      e.preventDefault();
      $.ajax({
        url: '/api/docvisits/' + $("#visits").attr("data-name") + '/'+ $("#visits").attr("data-lastname"),
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#docvisitstable").empty();
          var htmltoadd = "<tr><th>Pacjent</th><th>Godzina</th><th>Dzień</th><th>Akcje</th></tr>";
          $.each(response.visits, function(key, value) {
              htmltoadd = htmltoadd +
                "<tr>"+
                  "<th>"+ value.patient +"</th>"+
                  "<th>"+ value.hour +"</th>"+
                  "<th>" + value.day + "</th>"+
                  "<th>  <button class='userinfo' data-value='"+ value.patient + "'>Szczegółowe dane pacjenta</button></th>"+
                "</tr>";
          });

          $("#docvisitstable").append(htmltoadd);
          HideAll();
          $("#myvisits").toggle("slow");
        },
        error: function() {
        },
      });
  });

 $('body').on("click", ".userinfo", function (e){
      e.preventDefault();
      $.ajax({
        url: '/api/useronebyname/' + $(".userinfo").attr("data-value"),
        type: 'GET',
        dataType: 'json',
        success: function(response) { 
          $("#userinfocontener").empty();
          $("#userinfocontener").append(
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