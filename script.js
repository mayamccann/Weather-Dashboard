$(document).ready (function () {

$("#search-button").on("click", function () {

var searchTerm = $("#search-value").val();

$("search-value").val ("");
weatherfunction (searchTerm);
weatherforecast (searchTerm);
}) ;

$("#search-button").keypress (function (event) {
var keycode = (event.keyCode ? event.keyCode : event.which);
if (keycode === 13) {
    weatherfunction (searchTerm);
    weatherforecast (searchTerm);
}
});

var history = JSON.parse (localStorage.getItem("history")) || [];

if (history.length > 0) {
    weatherfunction(hisotry[history.length -1]); 
}

for (var i = 0; i < history.length; i++) {
    createrow(history[i]);
}

function createrow(text) {
    var listItem = $("<li>").addClass ("list-group-item").text (text);
    $(".history").append(listItem);
}

$(".history").on("click", "li", function () {
    weatherfunction($(this).text());
    weatherforecast($(this).text());
});

function weatherfunction(searchTerm) {

    $.ajax ({
    type: "GET"
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=9f112416334ce37769e5c8683b218a0d",