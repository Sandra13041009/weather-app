/* eslint-disable no-undef */
//Day and time settings
let currentTime = new Date();
let h6 = document.querySelector("h6");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];
let day = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes = ('0' + currentTime.getMinutes()).slice(-2);
h6.innerHTML = `${day}, ${hours}:${minutes}`;

//Getting weather data
function getTemp(event) {
	event.preventDefault();
	let apiKey = "98612a22cb9a3addb8d9134910c82826";
	let city = document.querySelector("#searchResult").value;
	let units = "metric";
	let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
	let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(displayWeather);
}


function displayWeather(response) {
	let cityHeading = document.querySelector("#resultCity");
	cityHeading.innerHTML = response.data.name;
	let showTemp = document.querySelector("#resultTemperature");
	showTemp.innerHTML = Math.round(response.data.main.temp);
	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = response.data.weather[0].description;
	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = response.data.main.humidity;
	let windElement = document.querySelector("#wind");
	windElement.innerHTML = Math.round(response.data.wind.speed);
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	celsiusTemp = response.data.main.temp;

	getForecast(response.data.coord);

}
let searchInput = document.querySelector("#searchButton");
searchInput.addEventListener("click", getTemp);


//Current location
function retrievePosition(position) {
	let apiKey = "98612a22cb9a3addb8d9134910c82826";
	let units = "metric";
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
	axios.get(url).then(displayWeather);
}

function showGPS(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(retrievePosition);
}
let button = document.querySelector("#currentLocation");
button.addEventListener("click", showGPS);

//Default City
function search(city) {
	let apiKey = "98612a22cb9a3addb8d9134910c82826";
	let units = "metric";
	let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
	let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#searchResultt");
	search(cityInputElement.value);
}
let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);
search("Detroit");

//Unit conversion
function showFahrenheitTemperature(event) {
	event.preventDefault();
	let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
	let tempResult = document.querySelector("#resultTemperature");
	tempResult.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemperature(event) {
	event.preventDefault();
	let tempResult = document.querySelector("#resultTemperature");
	tempResult.innerHTML = Math.round(celsiusTemp);
}

let fahrenheit = document.querySelector("#Fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);
let celsius = document.querySelector("#Celsius");
celsius.addEventListener("click", showCelsiusTemperature);
let celsiusTemp = null;

//Forecast

function getForecast(coordinates) {
	let apiKey = "98612a22cb9a3addb8d9134910c82826";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	

	axios.get(apiUrl).then(displayForecast);
}

displayForecast();

function displayForecast(response) {

	let forecast = response.data.daily;

	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;

	forecast.forEach(function (forecastDay, index) {
		if (index < 6) 
		forecastHTML =
		forecastHTML +
		`
            <div class="col-2">
                <span>${formatDay(forecastDay.dt)}</span><br>
                <strong><span class="tempMax">${Math.round(forecastDay.temp.max)}</span>°  <span class="tempMin">(${Math.round(forecastDay.temp.min)}</span>°)</strong>
				<img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class="img-fluid" width="42">
            </div>
`;
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
	let date = new Date(timestamp*1000);
	let day = date.getDay();

	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return days[day];

}








