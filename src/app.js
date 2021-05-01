//1
let currentTime = new Date();

let h6 = document.querySelector("h6");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes = ('0' + currentTime.getMinutes()).slice(-2);

h6.innerHTML = `${day}, ${hours}:${minutes}`;


//2
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
  showTemp.innerHTML = `${Math.round(response.data.main.temp)} °C`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
}
let searchInput = document.querySelector("#searchButton");
searchInput.addEventListener("click", getTemp);


//3
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
