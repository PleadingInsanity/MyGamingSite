//This is the JavaScript file for the Contact page. Any saved items from the Favourites page appear here.

$(document).ready(function () {

     // Dropdown menu Jquery and JavaScript

    $(".dropdown-menu").css('margin-top', 0);
    $(".dropdown").hover(function () {
        $(this).find(".dropdown-menu").toggleClass("show");
    });

    //Retrieves number of articles from local storage abd displays each article to look the same as it does on the Favourites page

    for (let i = 1 ; i <= Number(localStorage.getItem(`noOfArticles`)) ; i++) {
        $(".saved-items").append(`<div class = 'container fav-game${i}'></div>`);
        if (localStorage.getItem(`saved${i}`) === 'true') {
            $(`.fav-game${i}`).append(localStorage.getItem(`game${i}`));
        } else {
            $(`.fav-game${i}`).empty();
        }
    };

});