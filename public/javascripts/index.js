$(document).ready(function() {

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

    $("[href]").each(function() {
    if (this.href == window.location.href) {
        $(this).css("border-bottom"," 1px solid #EBD89D");
        $(this).css("background-color","#EBD89D");
        }
    });

    var daysToDisable = [2, 4, 7];

	$('#date').datepicker({
	    beforeShowDay: disableSpecificWeekDays,
		monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
		'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
        monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze','Lip',
        'Sie','Wrz','Pa','Lis','Gru'],
        dayNamesShort: [ "Ni", "Pon", "Wt", "Śr", "Czw", "Pi", "So" ],
        dayNamesMin: [ "Ni", "Pon", "Wt", "Śr", "Czw", "Pi", "So" ],
        dayNames: ['Niedziela','Poniedzialek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
        minDate: 0,

	});

	function disableSpecificWeekDays(date) {
		var day = date.getDay();
		for (i = 0; i < daysToDisable.length; i++) {
		    if ($.inArray(day, daysToDisable) != -1) {
		        return [false];
		    }
		}
		return [true];
	}

});