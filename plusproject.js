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
  currentTime.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;
}

//function to change weather info
function showCurrentWeather(response) {
  console.log(response.data);
  let requestedCity = response.data.name;
  let cityHeader = document.querySelector("#current-city");
  cityHeader.innerHTML = requestedCity;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let feelingTemp = document.querySelector("#feeling-temp");
  feelingTemp.innerHTML = Math.round(response.data.main.feels_like);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
}

// function for api-call on city input
function getInputCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let unit = "metric";
  let apiKey = "11b1ac6d031ef3383bff60ed1c7846bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

//function for api-call on current location
function getCurrentLocation(event) {
  event.preventDefault();
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let unit = "metric";
    let apiKey = "11b1ac6d031ef3383bff60ed1c7846bb";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showCurrentWeather);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

//function to change to Fahrenheit
function changeToFahrenheit() {
  let fahrenheit = document.querySelector("#fahrenheit");
  let celcius = document.querySelector("#celcius");
  let currentTemp = document.querySelector("#current-temp");
  fahrenheit.style.fontWeight = "bold";
  fahrenheit.style.fontSize = "14px";
  celcius.style.fontWeight = "normal";
  celcius.style.fontSize = "12px";
  currentTemp.innerHTML = 69;

  let feelingTemp = document.querySelector("#feeling-temp");
  let minTemp = document.querySelector("#min-temp");
  let maxTemp = document.querySelector("#max-temp");
  feelingTemp.innerHTML = 66;
  minTemp.innerHTML = 50;
  maxTemp.innerHTML = 86;
}

//function to change to Celcius
function changeToCelcius() {
  let fahrenheit = document.querySelector("#fahrenheit");
  let celcius = document.querySelector("#celcius");
  let currentTemp = document.querySelector("#current-temp");
  celcius.style.fontWeight = "bold";
  celcius.style.fontSize = "14px";
  fahrenheit.style.fontWeight = "normal";
  fahrenheit.style.fontSize = "12px";
  currentTemp.innerHTML = 21;

  let feelingTemp = document.querySelector("#feeling-temp");
  let minTemp = document.querySelector("#min-temp");
  let maxTemp = document.querySelector("#max-temp");
  feelingTemp.innerHTML = 19;
  minTemp.innerHTML = 10;
  maxTemp.innerHTML = 30;
}

// call function for current day & time
currentTime(new Date());

// call function to get location from search input
let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", getInputCity);

//call function to get current location on click
let currentLocationButton = document.querySelector("#search-current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

// call function to change to Fahrenheit
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

// call function to change to Celcius
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeToCelcius);
