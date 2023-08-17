//variables : global 

var apiKey = "1b18ce13c84e21faafb19c931bb29331";
var savedsearches = [];

// Search History : Search for a City

var searchhistorylist = function(cityName) {
    $('.past-search:contains("' + cityName + '")').remove();
    
//Entry for city 

var searchhistoryEntry = $("<p>");
searchhistoryEntry.addClass("past-search");
searchhistoryEntry.text(cityName);

//Container for entry
var searchentrycontainer = $("<div>");
searchentrycontainer.addClass("past-search-container");

//Append entry for container
searchentrycontainer.append(searchhistoryEntry);

//Append entry container for search history container
var searchhistoryContainerE1 = $("search-history-container");
searchhistoryContainerE1.append(searchentrycontainer);

if (savedsearches.length > 0) {
    var previoussavedsearches = localStorage.getItem("savedsearches");
    savedsearches = JSON.parse(previoussavedsearches);
}

//Saved searches : City name to array 
savedsearches.push(cityName);
localStorage.setItem("savedsearches", JSON.stringify(savedsearches));

//Search : RESET
$("#search-input").val("");

};

// Search history into search history container
var loadsearchhistory = localStorage.getItem("savedsearches");

//Receive saved history
var savedsearchhistory = localStorage.getItem("savedsearches");

//false : no saved history
if (!savedsearchhistory) {
    return false;
}

// History string into array
savedsearchhistory = JSON.parse(savedsearchhistory);

//with savedsearchhistory array -> entry for each item in list
for (var i = 0; i < savedsearchhistory.length; i++) {
    searchhistorylist(savedsearchhistory[i]);
}
};

var currentweathersection =function(cityName) {

    //using open weather api
    fetch('https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}')

    //response -> objects
    .then(function(response) {
        return response.json();
})

.then(function(response) {
//city coordinates
var cityLon= response.coord.lon;
var cityLat= response.coord.lat;
}

fetch('https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely, hourly,alerts&units=imperial&appid=${apiKey}')
//response of api call --> objects
.then(function(response) {
    return response.json();
})

//data of response --> current weather section
.then(function(response){
    searchhistorylist(cityName);

//current weather container
var currentweathercontainer = $("#current-weather-container");
currentweathercontainer.addClass("current-weather-container");

//Weather section title : weather icon, city, date
var currenttitle = $("#current-title");
var currentday = moment().format("MM/DD/YYYY");
currenttitle.text('${cityName} (${currentday})');
var currenticon = $("current-weather-icon");
currenticon.addClass("current-weather-icon");
var currenticoncode = response.current.weather[0].icon;
currenticon.attr("src", 'https://openweathermap.org/img/wn/${currenticoncode}@2x.png');

//Temperature : status : current
var currenttemperature = $("#current-temperature");
currenttemperature.text("Temperature: " + response.current.temp + "/u00B0F");

//Humidity : status : current
var currenthumidity = $("#current-humidity");
currenthumidity.text("Humidity: " + response.current.humidity + "%");

//Wind Speed : status : current
var currentwindspeed = $("#current-wind-speed");
currentwindspeed.text("Wind Speed: " + response.current.wind_speed + "MPH");

//UV Index : status : current
var currentuvindex = $("#current-uv-index");
currentuvindex.text("UV Index: ");
var currentnumber = $("#current-number");
currentnumber.text(response.current.uvi);

//Color to Index Numbers : red, yellow or green (background color)
if (response.current.uvi <= 2) {
    currentnumber.addClass("favorable");
} else if (response.current.uvi >= 3 && response.current.uvi <= 7) {
    currentnumber.addClass("moderate");
} else {
    currentnumber.addClass("severe");
}

})