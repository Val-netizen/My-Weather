// Feature #1
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();

let h4 = document.querySelector("h4");
h4.innerHTML = `${day} ${date} ${month}`;

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = `${hours}:${minutes}`;

// Weather API
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML =
  response.data.weather[0].main;
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function search(city) {
  let apiKey = "4818761c04ded58b3835bb3810566f23";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "4818761c04ded58b3835bb3810566f23";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Dublin");

// Feature #3
function showFahrenheit() {
  displayTemp.innerHTML = "34";
}

function showCelsius() {
  displayTemp.innerHTML = "14";
}
let fahrenheitToggle = document.querySelector("#fahrenheit-link");
let celsiusToggle = document.querySelector("#celsius-link");
let displayTemp = document.querySelector("#current-temperature");

fahrenheitToggle.addEventListener("click", showFahrenheit);
celsiusToggle.addEventListener("click", showCelsius);
