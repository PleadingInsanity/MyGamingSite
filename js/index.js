//This is the JavaScript file for the Index or Home page. A dropdown menu was added.

$(document).ready(function () {

    // Dropdown menu Jquery and JavaScript

    $(".dropdown-menu").css('margin-top', 0);
    $(".dropdown").hover(function () {
        $(this).find(".dropdown-menu").toggleClass("show");
    });

    


});