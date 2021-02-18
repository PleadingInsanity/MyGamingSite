/*This is the JavaScript file for the About page. The about gives a short blurb about me and allows the user to click on 
blockquotes which then animates to get another quote*/

$(document).ready(function () {

    // Dropdown menu Jquery and JavaScript

    $(".dropdown-menu").css('margin-top', 0);
    $(".dropdown").hover(function () {
        $(this).find(".dropdown-menu").toggleClass("show");
    });

    /*For each blockquote a click will animate the object to the left and set the opacity to zero and display to none 
    (class "d-none" in Bootstrap). It will then animate the blockquote back to its original position and then
    toggle the visibility of the next quote to make it appear. I used callback functions to get the order of events correct.*/

    $(`.blockquote`).each(function (index) {
        $(this).on("click", function (evt) {
            $(`.blockquote${index}`).animate({ "right": "+=300px" }, 1000).animate({ "opacity": "0" }, 1000, function () {
                $(`.blockquote${index}`).toggleClass("d-none")
            }).animate({ "right": "-=300px", "opacity": "1" }, function () {
                $(`.blockquote${(index + 1) % $(".blockquote").length}`).toggleClass("d-none")
            });
            evt.preventDefault();
        });
    });

});