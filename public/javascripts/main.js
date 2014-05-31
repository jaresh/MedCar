$(document).ready(function() {

// Menu style

    $("[href]").each(function() {
    if (this.href == window.location.href) {
        $(this).css("border-bottom"," 1px solid #EBD89D");
        $(this).css("background-color","#EBD89D");
        }
    });

// ------------------------

});