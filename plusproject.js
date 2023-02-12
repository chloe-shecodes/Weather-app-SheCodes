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

// function to format forecast day
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day + 1];
}

//function to show forecast
function showForecast(response) {
  let forecast = response.data.daily;
  for (let i = 0; i < forecast.length; i++) {
    let day = document.querySelector(`#forecast-day${i + 1}`);
    day.innerHTML = formatDay(forecast[i].time);
    let icon = document.querySelector(`#icon-day${i + 1}`);
    icon.src = forecast[i].condition.icon_url;
    icon.alt = forecast[i].condition.icon;
    let minTemp = document.querySelector(`#forecast-temp-min-day${i + 1}`);
    minTemp.innerHTML = `${Math.round(forecast[i].temperature.minimum)}°`;
    let maxTemp = document.querySelector(`#forecast-temp-max-day${i + 1}`);
    maxTemp.innerHTML = `${Math.round(forecast[i].temperature.maximum)}°`;
  }
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

  let wind = document.querySelector("#wind");
  wind.innerHTML = ` ${Math.round(response.data.wind.speed)} km|h`;
  let humidity = document.querySelector("#humidity");
  let feelslikeTemp = document.querySelector("#feels-like-temp");
  feelslikeTemp.innerHTML = `feels like ${Math.round(
    response.data.temperature.feels_like
  )}°`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
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
  alert(
    "Student at work! 👋🏼🤓 \nOnly the current temperature will be converted to Fahrenheit atm. Still lots to learn and more to come! 🤞🏼👩🏼‍💻"
  );
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
