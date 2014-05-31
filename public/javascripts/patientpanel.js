$(document).ready(function() {

	
// DATA PICKER

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

// ------------------------

});