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
			var lat = response.coord.lat;
			var lon = response.coord.lon;
			var uvURL =
				"http://api.openweathermap.org/data/2.5/uvi/forecast?" +
				apiKey +
				"&lat=" +
				lat +
				"&lon=" +
				lon +
				"&cnt=1";
			$.ajax({
				url: uvURL,
				method: "GET"
			}).then(function(response) {
				var UVindex = $("#currentUV");
				UVindex.text("UV Index: " + response[0].value);
			});

			console.log(response.name);
			// console.log(temp1.weather[0].icon);
			// console.log(Math.floor(tempF));
			// console.log(temp1.main.humidity);
			// console.log(temp1.wind.speed);

			// let tempF = (response.main.temp - 273.15) * 1.8 + 32;

			// Current Conditions for Searched City Name
			getCurrentWeather(response);
			// // Current Forecast for Searched City Name
			getCurrentForecast(city);
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
				currentTempF.append(
					((response.main.temp - 273.15) * 1.8 + 32).toFixed(2)
				);
				var currentHumidity = $("#current-humidity");
				currentHumidity.append(response.main.humidity);
				var windSpeed = $("#current-Windspeed");
				windSpeed.append(response.wind.speed);
			}
		});
	// Function for getting 5 Day Forecast
	function getCurrentForecast(city) {
		$.ajax({
			url:
				"https://api.openweathermap.org/data/2.5/forecast?q=" +
				city +
				apiKey,
			method: "GET"
		}).then(function(response) {
			console.log(response);
			var dayIndex = 1;
			for (let index = 0; index < response.list.length; index++) {
				const element = response.list[index];
				if (element.dt_txt.indexOf("15:00:00") !== -1) {
					dayWeather(dayIndex++, element);
				}
			}
		});
	}
	function dayWeather(id, response) {
		var day = $("#day" + id);
		var currentTempF = $("<p>");
		currentTempF.append(
			"Temperature: " +
				((response.main.temp - 273.15) * 1.8 + 32).toFixed(2)
		);
		var currentHumidity = $("<p>");
		currentHumidity.append("Humidity: " + response.main.humidity);
		var windSpeed = $("<p>");
		windSpeed.append("Wind Speed: " + response.wind.speed);
		day.append(currentTempF, currentHumidity, windSpeed);
	}
});

// Local storage for List Items
