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
        error: function(xhRequest, ErrorText, thrownError) {
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
      e.preventDefault();
      $.ajax({
        url: '/api/docone/' + $(this).attr("data-name") + '/' + $(this).attr("data-lastname"),
      	type: 'GET',
        success: function(response) { 

        	var daysToDisable = [0,1,2,3,4,5,6];

        	$('#date').datepicker( "destroy" );

        	if(response.docs.workingdays.pon)
        	{
        		console.log("pon" + response.docs.workingdays.pon);
        		var index = daysToDisable.indexOf(1);

        		if (index > -1) {
    				daysToDisable.splice(index, 1);
				}
        	}

        	if(response.docs.workingdays.wt)
        	{
        		console.log("wt" + response.docs.workingdays.wt);
        		var index = daysToDisable.indexOf(2);
        		
        		if (index > -1) {
    				daysToDisable.splice(index, 1);
				}
        	}

        	if(response.docs.workingdays.sr)
        	{
				console.log("sr" + response.docs.workingdays.sr);
        		var index = daysToDisable.indexOf(3);
        		
        		if (index > -1) {
    				daysToDisable.splice(index, 1);
				}
        	}

        	if(response.docs.workingdays.czw)
        	{
        		console.log("czw" + response.docs.workingdays.czw);
        		var index = daysToDisable.indexOf(4);
        		
        		if (index > -1) {
    				daysToDisable.splice(index, 1);
				}
        	}

        	if(response.docs.workingdays.pi)
        	{
        		console.log("pi" + response.docs.workingdays.pi);
        		var index = daysToDisable.indexOf(5);
        		
        		if (index > -1) {
    				daysToDisable.splice(index, 1);
				}
        	}
        	if(response.docs.workingdays.so)
        	{
        		console.log("so" + response.docs.workingdays.so);
        		var index = daysToDisable.indexOf(6);
        		
        		if (index > -1) {
    				daysToDisable.splice(index, 1);
				}
        	}
        	if(response.docs.workingdays.ni)
        	{
        		console.log("ni" + response.docs.workingdays.ni);
        		var index = daysToDisable.indexOf(0);
        		
        		if (index > -1) {
    				daysToDisable.splice(index, 1);
				}
        	}

        	console.log("Tablica z dniami: " + daysToDisable);

        	function disableSpecificWeekDays(date) {
				var day = date.getDay();
				for (i = 0; i < daysToDisable.length; i++) {
		    		if ($.inArray(day, daysToDisable) != -1) {
		    	   		return [false];
		    		}
				}
				return [true];
			}

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

			$("#uservisitaddform").hide();

         	$("#uservisitaddform").toggle("slow");
        },
        error: function(xhRequest, ErrorText, thrownError) {
          console.log(ErrorText);
        },
      });
  });

  	$("#docshow").click(function(e){
      HideAll();
      DocList(e);
  	});

});