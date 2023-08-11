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

    }) .then(function (data) {

    if (history.indexOf (searchTerm) === -1) {
        history.push(searchTerm);
        localStorage.setItem("history", JSON.stringify(history));
        createrow(searchTerm);
    }

    $("#today").empty();

    var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date ().toLocaleDateString() + ")");
    var img = $("<img").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

    var card = $("<div>").addClass("card");
    var cardbody = $("<div>").addClass("card-body");
    var wind = $("<p>").addClass("card-text").text("wind Speed:" + data.wind.speed + "MPH");
    var humid = $("<p>").addClass("card-text").text("Humidity:" + data.main.humidity + "%");
    var temp = $("<p>").addClass("card-text").text("Temperature:" + data.main.temp + "K");
    
    console.log(data)
    
    var lon = data.coord.lon;
    var lat= data.coord.lat;

    $.ajax({
    type: "GET"
    url: "https://api.openweathermap.org/data/2.5/uvi?appid=9f112416334ce37769e5c8683b218a0d&lat=" + lat + "&lon=" + lon,

    }) .then(function (response) {
        console.assert.log(response);
    