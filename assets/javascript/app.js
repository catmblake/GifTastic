$(document).ready(function() {

    var topics = ["Dwight Schrute", "Michael Scott", "Liz Lemon", "Jack Doneghy", "Leslie Knope", "Ron Swanson", "Chandler Bing", "Ross Geller", "John Dorian", "Dr. Cox"]
    for (i=0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.addClass("tv-character");
        btn.attr("data-name", topics[i]);
        btn.html("<h4>" + topics[i] + "</h4>");
        $("#target-div").prepend(btn);
    }
});