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


}