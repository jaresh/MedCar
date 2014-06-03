/*jshint smarttabs:true */
/*global $:false */
// checked with jshint
$(document).ready(function() {

    $(document.getElementById("content")).hide();
    $(document.getElementById("content")).toggle("slow");
    $(document.getElementById("main_menu")).hide();
    $(document.getElementById("main_menu")).toggle("slow");

	function ValidateAll(){
	
		if($("div[data-status='error']").text() !== ""){
			$('button[type="submit"]').attr("disabled", true);
		}
		else{
			$('button[type="submit"]').attr("disabled", false);
		}
	}

	function StringValidate(str,errorel){

        console.log(errorel);

		if(str.match(/[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0123456789]+/))
        {
            $(errorel).text("Nieprawidłowy znak.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else
        {
            if($("#admindocform").length)
            {

                if(errorel == "#loginerror" || errorel == "#loginerror2")
                {
                    console.log("Jestem tutaj");
                     $.ajax({
                        url: '/api/findlogin/' + str,
                        type: 'GET',
                        success: function(response) { 
                            if(response.findlogin)
                            {
                                $(errorel).text("Podany login juz istnieje.");
                                $(errorel).attr("data-status","error");
                                $(errorel).prev().css("background-color","rgb(245, 76, 76)");
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
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else
        {
            var peselnow = $('#adminuserform').attr("action").split("/");

            $.ajax({
                url: '/api/userone/' + str,
                type: 'GET',
                success: function(response) { 
                    if(response.docs && peselnow[3] != str)
                    {
                        $(errorel).text("Podany pesel juz istnieje.");
                        $(errorel).attr("data-status","error");
                        $(errorel).prev().css("background-color","rgb(245, 76, 76)");
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
        ValidateAll();
	}

	function SecondnameValidate(str,errorel){
		if(str.match(/[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0123456789]+/) && str!="-")
        {
            $(errorel).text("Neprawidłowy znak. Jeżeli nie dotyczy wpisz '-'.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
        }
        else
        {
            $(errorel).attr("data-status","good");
            $(errorel).prev().css("background-color","white");
            $(errorel).text("");
        }
        ValidateAll();
	}

    function TitleValidate(str,errorel){
        if(str.match(/[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0123456789\s]+/) && str!="-")
        {
            $(errorel).text("Neprawidłowy znak.");
            $(errorel).attr("data-status","error");
            $(errorel).prev().css("background-color","rgb(245, 76, 76)");
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

    $("#main_menu button").each(function() {
        var link = window.location.href.split("/");

        if(link[link.length-1] === "")
            link[link.length-1] = "mainlink";

        if ($(this).attr("id") == link[link.length-1]) {
            $(this).css("background-color","#C7C7C7");
        }
    });

    $('body').on("click", "#mainlink", function (){
        $(document.getElementById("main_menu")).toggle("slow");
        $('#content').toggle("slow",function () {
            window.location.replace("http://localhost:3000/");
        });
    });

    $('body').on("click", "#patientpanel", function (){
        $(document.getElementById("main_menu")).toggle("slow");
        $('#content').toggle("slow",function () {
            window.location.replace("http://localhost:3000/patientpanel");
        });
    });

    $('body').on("click", "#profile", function (){
        $(document.getElementById("main_menu")).toggle("slow");
        $('#content').toggle("slow",function () {
            window.location.replace("http://localhost:3000/profile");
        });
    });

    $('body').on("click", "#adminpanel", function (){
        $(document.getElementById("main_menu")).toggle("slow");
        $('#content').toggle("slow",function () {
            window.location.replace("http://localhost:3000/adminpanel");
        });
    });

    $('body').on("click", "#docpanel", function (){
        $(document.getElementById("main_menu")).toggle("slow");
        $('#content').toggle("slow",function () {
            window.location.replace("http://localhost:3000/docpanel");
        });
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

    $('#adminuserform input[name="nameuser"]').on('keyup change', function() {
        StringValidate($(this).val(),"#nameerror2");
    });

    $('#adminuserform input[name="lastnameuser"]').on('keyup change', function() {
        StringValidate($(this).val(),"#lastnameerror2");
    });

    $('#adminuserform input[name="secondnameuser"]').on('keyup change', function() {
        SecondnameValidate($(this).val(),"#secondnameerror2");
    });

    $('#adminuserform input[name="pesel"]').on('keyup change', function() {
        PeselValidate($(this).val(),"#peselerror");
    });

// ------------------------

    $('#adminnewsform input[name="title"]').on('keyup change', function() {
        TitleValidate($(this).val(),"#titleerror");
    });

});