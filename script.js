// DOM Elements
var apiKey = "&appid=43b150c9d098f7c4ffc1080bdaa12675";

// Store value of input
var city = $("#searchTerm").val();

var date = new Date();

let temp1;

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

			console.log(response.name);
			// console.log(response.weather[0].icon);
			// console.log(Math.floor(tempF));
			// console.log(response.main.humidity);
			// console.log(response.wind.speed);
			// console.log(response.uv)

			// Current Conditions for Searched City Name
			getCurrentConditions(response);
			// Current Forecase for Searched City Name
			getCurrentForecast(response);
			// Searches create a list below and is stored in local storage:
			makeList();
		});

	// Make list items to store searches in:
	function makeList() {
		var searchHistory = $("#search-history");
		let listItem = $("<li>")
			.removeClass("hide")
			.text(city);
		// Prepend search items so they appear at the front
		$().prepend(searchHistory);
	}
});

// Local storage for list thing
