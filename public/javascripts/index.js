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
            var htmltoadd = "";
            $.each(response.docs, function(key,value) {

                htmltoadd = htmltoadd + "<div class='newsonindex'>" + "<h2>"+ value.title +"</h2>" + 
                                        "<p>"+ value.date + "</p><br>" + value.content +"</p><hr>" + "</div>";
            });
            $("#content").append(htmltoadd);
          },
          error: function() {
            console.log("Błąd AJAX");
          },
        });
  }

  NewsList();

});