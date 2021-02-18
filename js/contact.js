/*This is the JavaScript file for the Contact page. It contains a form that is not currrently functional 
that allows the user to contact me*/

$(document).ready(function () {

    // Dropdown menu Jquery and JavaScript

    $(".dropdown-menu").css('margin-top', 0);
    $(".dropdown").hover(function () {
        $(this).find(".dropdown-menu").toggleClass("show");
    });

    //Refeshes the page and empties inputs when form is submitted

    $(".submit").click(function () {
        $("form").trigger("reset");
    });



});