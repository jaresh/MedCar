$(document).ready(function() {

  $("#visits").click(function(e){
      e.preventDefault();
      $.ajax({
        url: '/api/docvisits/' + $("#visits").attr("data-name") + '/'+ $("#visits").attr("data-lastname"),
        type: 'GET',
        dataType: 'json',
        success: function(response) {	
        	$.each(response.visits, function(key, value) {
          		$("#myvisits").append("<p>" + value.patient + " " + value.day + " " + value.hour + "</p>" );
        	});
        },
        error: function() {
        },
      });
	});
  
});