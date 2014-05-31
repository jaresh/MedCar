$(document).ready(function() {

// Login form

	$('#accountselect').bind('change', function () {
          var type = $(this).val(); 
          
          if (type == "user") { 
              $("#loginformaction").attr("action", "/login")
          }
          else if (type == "doc") { 
              $("#loginformaction").attr("action", "/logindoc")
          }
          
          else if (type == "admin") { 
              $("#loginformaction").attr("action", "/loginadmin")
          }
          
          return false;
    });
// ------------------------

});