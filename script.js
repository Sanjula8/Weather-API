// API Key:
var apiKey = "&appid=43b150c9d098f7c4ffc1080bdaa12675";

// Store value of input
var city = $("#searchTerm").val();

var date = new Date();

let temp1;

var searchHistory = $("#search-history");
var weatherStage = $("#weather-stage");
searchHistory.addClass("hide");
weatherStage.addClass("hide");

// Search Button Keypress:
// KeyCode 13 = Enter
$("#searchTerm").keypress(function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		$("#searchBtn").click();
	}
});

// Search Button On-Click Function:

$("#searchBtn").on("click", function() {
	event.preventDefault();
	// var city = "Dallas";
	var city = $("#searchCity").val();

	// Attach Weather API for Current City Weather
	var queryURL =
		"https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

	$.ajax({
		url: queryURL,
		method: "GET"
	})
		// We store all of the retrieved data inside of an object called "response"
		.then(function(response) {
			// Log the queryURL
			// console.log(queryURL);

			// Assign temp1 to response so I can see it in the console
			temp1 = response;
			// AJAX call for UV Index
			// var lat = response.coord.lat;
			// var lon = response.coord.lon;
			// var uvURL =
			// $.ajax({
			//     url:
			// })

			console.log(response.name);
			// console.log(temp1.weather[0].icon);
			// console.log(Math.floor(tempF));
			// console.log(temp1.main.humidity);
			// console.log(temp1.wind.speed);

			// let tempF = (response.main.temp - 273.15) * 1.8 + 32;

			// Current Conditions for Searched City Name
			getCurrentWeather(response);
			// // Current Forecast for Searched City Name
			getCurrentForecast(response);
			// Searches create a list below and is stored in local storage:
			makeList();

			// Make list items to store searches in:
			function makeList() {
				searchHistory.removeClass("hide");
				weatherStage.removeClass("hide");

				var listItem = $("<li>").text(city);
				// Prepend search items so they appear at the front
				$(listItem).prepend(searchHistory);
				console.log(response);
			}
			// Function for getting current weather conditions
			function getCurrentWeather(response) {
				var cityName = $("#city-name");
				cityName.append(response.name);
				var currentTempF = $("#current-Temp");
				currentTempF.append((response.main.temp - 273.15) * 1.8 + 32);
				var currentHumidity = $("#current-humidity");
				currentHumidity.append(response.main.humidity);
				var windSpeed = $("#current-Windspeed");
				windSpeed.append(response.wind.speed);
				// Make call for UV Index;
				// var UVindex = $("#currentUV");
			}
		});
	// Function for getting 5 Day Forecast
	function getCurrentForecast(response) {
		$.ajax({
			url:
				"https://api.openweathermap.org/data/2.5/forecast?q=" +
				city +
				apiKey,
			method: "GET"
		}).then(function(response) {
			console.log(response);
			var day1 = $("#day1");
			day1.append(response.list[0]);
			var day2 = $("#day2");
			day2.append(response.list[1]);
			var day3 = $("#day3");
			day3.append(response.list[2]);
			var day4 = $("#day4");
			day4.append(response.list[3]);
			var day5 = $("#day5");
			day5.append(response.list[4]);
		});
	}
});

// Local storage for List Items
