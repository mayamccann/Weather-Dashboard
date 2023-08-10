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