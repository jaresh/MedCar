/*jshint smarttabs:true */
/*global $:false */
// checked with jshint
$(document).ready(function() {

	function ValidateAll(){
	
		if($("div[data-status='error']").text() !== ""){
			$('button[type="submit"]').attr("disabled", true);
		}
		else{
			$('button[type="submit"]').attr("disabled", false);
		}
	}

	function StringValidate(str,errorel){
		if(str.match(/[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0123456789]+/))
        {
            $(errorel).text("Nieprawidłowy znak.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","#FFCCCC");
        }
        else
        {
            if($("#admindocform").length && $("#usersubmitbutton").text() == "Dodaj pacjenta")
            {

                if(errorel == "#loginerror" || errorel == "#loginerror2")
                {
                     $.ajax({
                        url: '/api/findlogin/' + str,
                        type: 'GET',
                        success: function(response) { 
                            if(response.findlogin)
                            {
                                $(errorel).text("Podany login juz istnieje.");
                                $(errorel).attr("data-status","error");
                                $(errorel).prev().css("background-color","#FFCCCC");
                            }
                            else
                            {  
                                $(errorel).attr("data-status","good");
                                $(errorel).prev().css("background-color","white");
                                $(errorel).text("");
                            }
                            ValidateAll();
                        },
                        error: function(ErrorText) {
                            console.log(ErrorText);
                        },
                    });
                }
            }

            $(errorel).attr("data-status","good");
            $(errorel).prev().css("background-color","white");
            $(errorel).text("");
        }
        ValidateAll();
	}

	function PeselValidate(str,errorel){

		if(str.match(/(\D|.{12,})/) || str.length != 11)
        {
            $(errorel).text("Pesel musi zawierać 11 cyfr.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","#FFCCCC");
        }
        else
        {
            var peselnow = $('#adminuserform').attr("action").split("/");

            if(str != peselnow[3])
            {
                $.ajax({
                url: '/api/userone/' + str,
                type: 'GET',
                success: function(response) { 
                    if(response.docs)
                    {
                        $(errorel).text("Podany pesel juz istnieje.");
                        $(errorel).attr("data-status","error");
                        $(errorel).prev().css("background-color","#FFCCCC");
                    }
                    else
                    {  
                        $(errorel).attr("data-status","good");
                        $(errorel).prev().css("background-color","white");
                        $(errorel).text("");
                    }
                    ValidateAll();
                },
                error: function(ErrorText) {
                    console.log(ErrorText);
                },
                });
            }
            else
            {
                $(errorel).attr("data-status","good");
                $(errorel).prev().css("background-color","white");
                $(errorel).text("");
            }
            
        }
        ValidateAll();
	}

	function SecondnameValidate(str,errorel){
		if(str.match(/[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0123456789]+/) && str!="-")
        {
            $(errorel).text("Neprawidłowy znak. Jeżeli nie dotyczy wpisz '-'.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","#FFCCCC");
        }
        else
        {
            $(errorel).attr("data-status","good");
            $(errorel).prev().css("background-color","white");
            $(errorel).text("");
        }
        ValidateAll();
	}

// Menu style

    $("[href]").each(function() {
    if (this.href == window.location.href) {
        $(this).css("border-bottom"," 1px solid #EBD89D");
        $(this).css("background-color","#EBD89D");
        }
    });

// ------------------------

// VALIDATORS

	$('input[name="login"]').on('keyup change', function() {
        StringValidate($(this).val(),"#loginerror");
    });

    $('input[name="password"]').on('keyup change', function() {
        StringValidate($(this).val(),"#passworderror");
    });

    $('input[name="name"]').on('keyup change', function() {
        StringValidate($(this).val(),"#nameerror");
    });

    $('input[name="lastname"]').on('keyup change', function() {
        StringValidate($(this).val(),"#lastnameerror");
    });

    $('input[name="secondname"]').on('keyup change', function() {
        SecondnameValidate($(this).val(),"#secondnameerror");
    });

    $('input[name="pesel"]').on('keyup change', function() {
        PeselValidate($(this).val(),"#peselerror");
    });

    // USER ADD FORM VALIDATION

    $('#adminuserform input[name="login"]').on('keyup change', function() {
        StringValidate($(this).val(),"#loginerror2");
    });

    $('#adminuserform input[name="password"]').on('keyup change', function() {
        StringValidate($(this).val(),"#passworderror2");
    });

    $('#adminuserform input[name="name"]').on('keyup change', function() {
        StringValidate($(this).val(),"#nameerror2");
    });

    $('#adminuserform input[name="lastname"]').on('keyup change', function() {
        StringValidate($(this).val(),"#lastnameerror2");
    });

    $('#adminuserform input[name="secondname"]').on('keyup change', function() {
        SecondnameValidate($(this).val(),"#secondnameerror2");
    });

    $('#adminuserform input[name="pesel"]').on('keyup change', function() {
        PeselValidate($(this).val(),"#peselerror");
    });

// ------------------------

});