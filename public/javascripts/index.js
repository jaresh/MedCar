/*jshint smarttabs:true */
/*global $:false */

$(document).ready(function() {
  
  function NewsList(){
        $.ajax({
          url: '/api/newsall',
          type: 'GET',
          dataType: 'json',
          success: function(response) { 
            $("#content").empty();
            $.each(response.docs, function(key,value) {

                $("#content").append("<h2>"+ value.title +"</h2>" + "<p>"+ value.date + "</p><br>" + value.content +"</p><hr>");

            });
          },
          error: function() {
            console.log("Błąd AJAX");
          },
        });
  }

  NewsList();

});