/*jshint smarttabs:true */
/*global $:false */
// checked with jshint

$(document).ready(function() {

    $(document.getElementById("content")).hide();
    $(document.getElementById("content")).toggle("slow");
    $(document.getElementById("main_menu")).hide();
    $(document.getElementById("main_menu")).toggle("slow");

// Menu style

    $("#main_menu button").each(function() {
        var link = window.location.href.split("/");

        if(link[link.length-1] === "")
            link[link.length-1] = "mainlink";

        if ($(this).attr("id") == link[link.length-1]) {
            $(this).css("background-color","#C7C7C7");
            $(this).css("border","none");
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

});