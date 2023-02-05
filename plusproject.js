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
  let requestedCity = response.data.city;
  let cityHeader = document.querySelector("#current-city");
  cityHeader.innerHTML = requestedCity;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = ` ${Math.round(response.data.wind.speed)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` ${Math.round(response.data.temperature.humidity)}`;
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  currentIcon.setAttribute(
    "alt",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.description}.png`
  );

  //let feelingTemp = document.querySelector("#feeling-temp");
  //feelingTemp.innerHTML = Math.round(response.data.main.feels_like);
  //let minTemp = document.querySelector("#min-temp");
  //minTemp.innerHTML = Math.round(response.data.main.temp_min);
  //let maxTemp = document.querySelector("#max-temp");
  //maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  console.log(response.data.condition.icon);
}

// function for api-call on city input
function getInputCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let unit = "metric";
  let apiKey = "cd2bcfo5ae203b19202a5050tb1b3849";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

//function for api-call on current location
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
  let fahrenheit = document.querySelector("#fahrenheit");
  let celcius = document.querySelector("#celcius");
  let currentTemp = document.querySelector("#current-temp");
  fahrenheit.style.fontWeight = "bold";
  fahrenheit.style.fontSize = "16px";
  fahrenheit.style.color = "#fdf0ec";
  celcius.style.fontWeight = "normal";
  celcius.style.fontSize = "14px";
  celcius.style.color = "#e7b5bb";
  currentTemp.innerHTML = 69;

  //let feelingTemp = document.querySelector("#feeling-temp");
  //let minTemp = document.querySelector("#min-temp");
  //let maxTemp = document.querySelector("#max-temp");
  //feelingTemp.innerHTML = 66;
  //minTemp.innerHTML = 50;
  //maxTemp.innerHTML = 86;
}

//function to change to Celcius
function changeToCelcius() {
  let fahrenheit = document.querySelector("#fahrenheit");
  let celcius = document.querySelector("#celcius");
  let currentTemp = document.querySelector("#current-temp");
  celcius.style.fontWeight = "bold";
  celcius.style.fontSize = "18px";
  celcius.style.color = "#fdf0ec";
  fahrenheit.style.fontWeight = "normal";
  fahrenheit.style.fontSize = "14px";
  fahrenheit.style.color = "#e7b5bb";
  currentTemp.innerHTML = 21;

  //let feelingTemp = document.querySelector("#feeling-temp");
  //let minTemp = document.querySelector("#min-temp");
  //let maxTemp = document.querySelector("#max-temp");
  //feelingTemp.innerHTML = 19;
  //minTemp.innerHTML = 10;
  //maxTemp.innerHTML = 30;
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
