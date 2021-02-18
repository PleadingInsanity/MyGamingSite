/* This is the JavaScript file for the Favourites page. On this page I added the ability to like or unlike articles, save or unsave 
them for later, add comments and view comments. The code is written the way it is to make it easier to add more articles. 
Any saved items should appear on the Save For Later page*/

$(document).ready(function () {

    // Dropdown menu Jquery and JavaScript

    $(".dropdown-menu").css('margin-top', 0);
    $(".dropdown").hover(function () {
        $(this).find(".dropdown-menu").toggleClass("show");
    });

    // Gives each like button the functionality of being liked or unliked and stores button status

    $(".like-btn").each(function (index) {
        $(this).on("click", function () {
            $(this).toggleClass(`liked${index + 1}`);
            if ($(this).hasClass(`liked${index + 1}`)) {
                $(`.liked${index + 1} i`).removeClass("far fa-heart").addClass("fas fa-heart");
                localStorage.setItem(`liked${index + 1}`, 'true');
            } else {
                $(this).find("i").removeClass("fas fa-heart").addClass("far fa-heart");
                localStorage.setItem(`liked${index + 1}`, 'false');
            }
        });
    });

    // Retrieves like or unlike status 

    $(".like-btn").each(function (index) {
        if (localStorage.getItem(`liked${index + 1}`) === "true") {
            $(this).addClass(`liked${index + 1}`)
            $(this).find("i").removeClass("far fa-heart").addClass("fas fa-heart");
        }
    });

    /* Gives each save button the functionality of being saved or unsaved 
    and stores button status. On Save icon click user is alerted as to how many saved items they have.*/

    $(".save-btn").each(function (index) {
        $(this).on("click", function () {
            $(this).toggleClass(`saved${index + 1}`);
            if ($(this).hasClass(`saved${index + 1}`)) {
                $(`.saved${index + 1} i`).removeClass("far fa-star").addClass("fas fa-star saved-item");
                localStorage.setItem(`saved${index + 1}`, 'true');
                let game = $(`.game${index + 1}`).html();
                localStorage.setItem(`game${index + 1}`, game);
            } else {
                $(this).find("i").removeClass("fas fa-star saved-item").addClass("far fa-star");
                localStorage.setItem(`saved${index + 1}`, 'false');
                localStorage.removeItem(`game${index + 1}`);
            }
            let totalSaved = $(".saved-item").length
            alert(`You have ${totalSaved} saved items.`)
        });
    });

    // Retrieves saved or unsaved status 

    $(".save-btn").each(function (index) {
        if (localStorage.getItem(`saved${index + 1}`) === "true") {
            $(this).addClass(`saved${index + 1}`)
            $(this).find("i").removeClass("far fa-star").addClass("fas fa-star");
        }
    });

    // Gives each article a comment form which is set to hidden (class "d-none" in Bootstrap)

    $(".article").each(function (index) {
        index = index + 1;
        $(this).after(`        
        <div class="container d-none cmt-form" id="cmt-form${index}">
        <h2>Enter a Comment</h2>
        <form>
            <label for="name${index}">Enter your name: </label>
            <br>
            <input type="text" name="name" id="name${index}" onkeydown="return event.key != 'Enter';">
            <br>
            <label for="subject-line${index}">Enter your subject line: </label>
            <br>
            <input type="text" name="subject-line" id="subject-line${index}" onkeydown="return event.key != 'Enter';">
            <br>
            <label for="comment${index}">Comment on the review:</label>
            <br>
            <textarea name="comment" id="comment${index}"></textarea>
            <br>
            <button class="add-cmt-btn">Add Comment</button>
        </form>
    </div>`)
    });

    // Declares comments array which will hold comments for each article


    let comments = {};

    // Function that displays comments for eahc article

    function displayComment(i) {
        let currentComment = comments[`comments${i}`]
        for (let j = 0; j < currentComment.length; j++) {
            $(`#cmt-display${i}`).append(`
    <div class = "comment container">
    <strong>Name:</strong> ${currentComment[j].name} <br>
    <strong>Subject-line:</strong> ${currentComment[j].subjectLine} <br> 
    <strong>Comment:</strong> ${currentComment[j].comment} <br> 
    </div>
    `);
        };
    };

    // For each article checks if local storage has comments stored and if so displays those comments under the relevant article

    for (let i = 1; i <= $(".article").length; i++) {
        function commentsStorage() {
            if (localStorage.getItem(`hasCodeRunBefore${i}`) === null) {
                localStorage.setItem(`hasCodeRunBefore${i}`, true);
                for (let i = 1; i <= $(".article").length; i++) {
                    comments[`comments${i}`] = [];
                }
                localStorage.setItem(`comments${i}`, JSON.stringify(comments[`comments${i}`]));
            } else {
                comments[`comments${i}`] = JSON.parse(localStorage.getItem(`comments${i}`));
                displayComment(i)
            };
        }
        commentsStorage();
    }

    //Gives click function to the view comment button to display previous comments

    $(".v-cmt-btn").each(function (index) {
        $(this).on("click", function () {
            $(`#cmt-display${index + 1}`).toggleClass("d-none");
        });
    });

    //Gives click function to the comment button to display comment form

    $(".cmt-btn").each(function (index) {
        $(this).on("click", function () {
            $(`#cmt-form${index + 1}`).toggleClass("d-none");
        });
    });

    //Constructor function to create a new comment object

    function Comment(name, subjectLine, comment) {
        this.name = name;
        this.subjectLine = subjectLine;
        this.comment = comment;
    };

    //Gives functionality to the add comment button and stores each new comment in the relevant array for the article

    $(".add-cmt-btn").each(function (index) {
        $(this).on("click", function (evt) {

            let newComment = new Comment(
                $(`#name${index + 1}`).val(),
                $(`#subject-line${index + 1}`).val(),
                $(`#comment${index + 1}`).val(),
            );
            comments[`comments${index + 1}`].push(newComment);
            localStorage.setItem(`comments${index + 1}`, JSON.stringify(comments[`comments${index + 1}`]));
            location.reload();
        })
    });

    //Stores number of articles which is used on the Save For Later page

    localStorage.setItem("noOfArticles", $(".article").length);
});