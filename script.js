$(document).ready(function () {

    $("#search-button").on("click", function () {

        var searchTerm = $("#search-value").val();

        $("#search-value").val("");
        weatherfunction(searchTerm);
        weatherforecast(searchTerm);
    });

    $("#search-button").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            weatherfunction(searchTerm);
            weatherforecast(searchTerm);
        }
    });

    var history = JSON.parse(localStorage.getItem("history")) || [];

    if (history.length > 0) {
        weatherfunction(history[history.length - 1]);
    }

    for (var i = 0; i < history.length; i++) {
        createrow(history[i]);
    }

    function createrow(text) {
        var listItem = $("<li>").addClass("list-group-item").text(text);
        $(".history").append(listItem);
    }

    $(".history").on("click", "li", function () {
        weatherfunction($(this).text());
        weatherforecast($(this).text());
    });

    function weatherfunction (searchTerm) {

        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=9f112416334ce37769e5c8683b218a0d",

        }).then(function (data) {

            if (history.indexOf(searchTerm) === -1) {
                history.push(searchTerm);
                localStorage.setItem("history", JSON.stringify(history));
                createrow(searchTerm);
            }

            $("#today").empty();

            var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
            var img = $("<img").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            var card = $("<div>").addClass("card");
            var cardbody = $("<div>").addClass("card-body");
            var wind = $("<p>").addClass("card-text").text("Wind Speed:" + data.wind.speed + "MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity:" + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature:" + data.main.temp + "K");

            console.log(data)

            var lon = data.coord.lon;
            var lat = data.coord.lat;

            $.ajax({
                type: "GET", 
                url: "https://api.openweathermap.org/data/2.5/uvi?d184452f39e2f2aa64702c8fc42297bf=" + lat + "&lon=" + lon,

            }).then(function (response) {
                console.log(response);

                var uvcolor;
                var uvresponse = response.value;
                var uvindex = $("<p>").addClass("card-text").text("UV Index:");
                var btn = $("<span>").addClass("btn btn-sm").text(uvresponse);

                if (uvresponse < 3) {
                    btn.addClass("btn-success");
                } else if (uvresponse < 7) {
                    btn.addClass("btn-warning");
                } else {
                    btn.addClass("btn-danger");
                }

                cardbody.append(uvindex);
                $("#today .card-body").append(uvindex.append(btn));

            });

            // // // 
            title.append(img);
            cardbody.append(title, temp, humid, wind);
            card.append(cardbody);
            $("#today").append(card);
            console.log(data);
        });
    }

        function weatherforecast(searchTerm) {
            $.ajax({
                type: "GET",
                url: "https://api.openweathermap.org/data/2.5/forecast?q" + searchTerm + "d184452f39e2f2aa64702c8fc42297bf",

            }).then (function (data) {
                console.log(data);
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

                for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf("15:00:00")!== -1) {

                    var titlefive = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                    var imgfive = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                    var colfive = $("<div>").addClass("col-md-2.5");
                    var cardfive = $("<div>").addClass("card bg-primary text-white");
                    var cardbodyfive = $("<div>").addClass("card-body p-2");
                    var humidfive = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                    var tempfive = $("<p>").addClass("card-text").text("Temperature:" + data.list[i].main.temp + "°F");


                    colfive.append(cardfive.append(cardbodyfive.append(titlefive, imgfive, tempfive)));
                    
                    $("#forecast .row").append(colfive);

                }
            }
        });
    }

});


