$(document).ready(function () {

    var topics = ["Dwight Schrute", "Michael Scott", "Liz Lemon", "Jack Doneghy", "Leslie Knope", "Ron Swanson", "Chandler Bing", "Ross Geller", "John Dorian", "Dr. Cox"]
    function createButtons() {
        $("#button-div").empty();
        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            btn.attr("type", "button")
            btn.addClass("btn btn-light");
            btn.addClass("tv-character");
            btn.attr("data-name", topics[i]);
            btn.html(topics[i]);
            $("#button-div").append(btn);
        }
    }
    $("#add-tv-character").on("click", function (event) {
        event.preventDefault();
        var character = $("#tv-character-input").val().trim();
        if (character) {
        topics.push(character);
        createButtons();
        $("#tv-character-input").val(null);
    }
    })
    createButtons();

    $(document).on("click", ".tv-character", function () {
        var characterName = $(this).attr("data-name");
        console.log(characterName);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + characterName + "&api_key=qSK7Kp3pe5UZ1uDgn5hFJyuDDLySKOYm&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;

                for (var j = 0; j < results.length; j++) {
                    var gifDiv = $("<div>");
                    gifDiv.attr("class", "col-md-4")
                    var p1 = $("<p>").html("<b>Title:</b> " + results[j].title);
                    var p2 = $("<p>").html("<b>Rating:</b> " + results[j].rating);
                    var characterImage = $("<img>");
                    characterImage.attr("src", results[j].images.fixed_height_still.url);
                    characterImage.attr("data-still", results[j].images.fixed_height_still.url);
                    characterImage.attr("data-animate", results[j].images.fixed_height.url);
                    characterImage.attr("data-status", "still");
                    characterImage.attr("class", "gif");
                    gifDiv.append(characterImage);
                    gifDiv.append(p1, p2);
                    $("#gif-div").prepend(gifDiv);
                }
            })
    })
    $(document).on("click", ".gif", function () {
        var status = $(this).attr("data-status")
        if (status === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-status", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-status", "still");
        }
    })
});