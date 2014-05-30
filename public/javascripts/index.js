$(document).ready(function() {

    $("[href]").each(function() {
    if (this.href == window.location.href) {
        $(this).css("border-bottom"," 1px solid white");
        }
    });

});