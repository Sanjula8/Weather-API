// DOM Elements
var apiKey = "&appid=43b150c9d098f7c4ffc1080bdaa12675";

// Store value of input
let city = $("#searchTerm").val();

let date = new Date();

// Search Button Keypress:
$("#searchTerm").keypress(function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		$("#searchBtn").click();
	}
});

// Search Button On-Function:

$("#searchBtn").on("click", function() {
	var city = "Dallas,US";
	// var city = $("#searchCity").val();

	// // Clear Search Box
	// $("#searchCity").val("");

	// Attach Weather API for Current City
	var queryURL =
		"https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

	$.ajax({
		url: queryURL,
		method: "GET"
	})
		// We store all of the retrieved data inside of an object called "response"
		.then(function(response) {
			// Log the queryURL
			console.log(queryURL);

			// Log the resulting object
			console.log(response);

			// console.log(response.name);
			// console.log(response.weather[0].icon);

			// let tempF = (response.main.temp - 273.15) * 1.8 + 32;
			// console.log(Math.floor(tempF));

			// console.log(response.main.humidity);

			// console.log(response.wind.speed);

			// getCurrentConditions(response);
			// getCurrentForecast(response);
			// makeList();
		});
});
