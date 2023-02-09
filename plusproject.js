// function for current day & time
function currentTime(date) {
  let currentTime = document.querySelector("#current-time");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  currentTime.innerHTML = `Last updated: ${currentDay}, ${currentHour}:${currentMinutes}`;
}

// work in progress
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//function to show forecast - work in progress
function showForecast(response) {
  console.log(response.data.daily[0].time);
  //let forecast = response.data.daily;
  let forecastDay = document.querySelectorAll("#forecast-day");
  forecastDay.forEach((forecastDay) => {
    forecastDay.innerHTML = response.data.daily[0].time;
  });
}

//function to get forecast
function getForecast(city) {
  let apiKey = "cd2bcfo5ae203b19202a5050tb1b3849";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showForecast);
}

//function to show current weather
function showCurrentWeather(response) {
  let requestedCity = response.data.city;
  let cityHeader = document.querySelector("#current-city");
  cityHeader.innerHTML = requestedCity;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  celciusTemperature = response.data.temperature.current;
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = ` ${Math.round(response.data.wind.speed)} km|h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` ${Math.round(response.data.temperature.humidity)} %`;
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  currentIcon.setAttribute(
    "alt",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.description}.png`
  );

  getForecast(response.data.city);

  //let feelingTemp = document.querySelector("#feeling-temp");
  //feelingTemp.innerHTML = Math.round(response.data.main.feels_like);
  //let minTemp = document.querySelector("#min-temp");
  //minTemp.innerHTML = Math.round(response.data.main.temp_min);
  //let maxTemp = document.querySelector("#max-temp");
  //maxTemp.innerHTML = Math.round(response.data.main.temp_max);
}

// function to get current weather on city input
function getInputCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let unit = "metric";
  let apiKey = "cd2bcfo5ae203b19202a5050tb1b3849";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

//function to get current weather on current location
function getCurrentLocation(event) {
  event.preventDefault();
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let unit = "metric";
    let apiKey = "cd2bcfo5ae203b19202a5050tb1b3849";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showCurrentWeather);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

//function to change to Fahrenheit
function changeToFahrenheit() {
  let currentTemp = document.querySelector("#current-temp");
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = Math.round((celciusTemperature * 9) / 5 + 32);
  currentTemp.innerHTML = fahrenheitTemp;

  //let feelingTemp = document.querySelector("#feeling-temp");
  //let minTemp = document.querySelector("#min-temp");
  //let maxTemp = document.querySelector("#max-temp");
  //feelingTemp.innerHTML = 66;
  //minTemp.innerHTML = 50;
  //maxTemp.innerHTML = 86;
}

//function to change to Celcius
function changeToCelcius() {
  let currentTemp = document.querySelector("#current-temp");
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
  let celciusTemp = Math.round(celciusTemperature);
  currentTemp.innerHTML = celciusTemp;

  //let feelingTemp = document.querySelector("#feeling-temp");
  //let minTemp = document.querySelector("#min-temp");
  //let maxTemp = document.querySelector("#max-temp");
  //feelingTemp.innerHTML = 19;
  //minTemp.innerHTML = 10;
  //maxTemp.innerHTML = 30;
}

let celciusTemperature = null;

// call function to change to Fahrenheit
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

// call function to change to Celcius
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeToCelcius);

// call function for current day & time
currentTime(new Date());

// call function to get location from search input
let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", getInputCity);

//call function to get current location on click
let currentLocationButton = document.querySelector("#search-current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
