$(document).ready(function () {

    var topics = ["Dwight Schrute", "Michael Scott", "Liz Lemon", "Jack Doneghy", "Leslie Knope", "Ron Swanson", "Chandler Bing", "Ross Geller", "John Dorian", "Dr. Cox"]
    function createButtons() {
        $("#button-div").empty();
        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            btn.addClass("tv-character");
            btn.attr("data-name", topics[i]);
            btn.html("<h4>" + topics[i] + "</h4>");
            $("#button-div").append(btn);
        }
    }
    $("#add-tv-character").on("click", function (event) {
        event.preventDefault();
        var character = $("#tv-character-input").val().trim();
        topics.push(character);
        createButtons();
        $("#tv-character-input").val(null);
    })
    createButtons();

    $(document).on("click", ".tv-character", function () {
        var characterName = $(this).attr("data-name");
        console.log(characterName);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + characterName + "&api_key=qSK7Kp3pe5UZ1uDgn5hFJyuDDLySKOYm&limit=10";

        $.ajax ({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(queryURL);
            console.log(response);

            var results = response.data;
            
            for (var j = 0; j < results.length; j++) {
                var gifDiv = $("<div>");
                var p = $("<p>").html("Rating: " + results[j].rating);
                var characterImage = $("<img>");
                characterImage.attr("src", results[j].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(characterImage);
                $("#gif-div").prepend(gifDiv);
            }
        })
    })
});