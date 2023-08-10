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
