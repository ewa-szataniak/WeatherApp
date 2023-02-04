/// Get current date and time

function dateTime() {
  let now = new Date();
  let day = now.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let dayMonth = now.getDate();
  let month = now.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let appDate = `${days[day]}, ${dayMonth} ${months[month]}  ${hour}:${minutes}`;
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = appDate;
}
dateTime();

///Name of the city after searching
function cityName(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city");
  if (cityDisplay.value) {
    currentCity.innerHTML = cityDisplay.value;
  } else {
    currentCity.innerHTML = null;
    alert("Please type a city");
    currentCity.innerHTML = "Nowhere";
  }
  let apiKey =
    "0fe8a8c3e267816d7e1a6e4de374af4d"; /*display searching city and temp part 11*/
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay.value}&appid=${apiKey}&units=metric`;
  axios.get(urlWeather).then(locationWeather);
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", cityName);

/// Display searching city and temperature part 2

function locationWeather(response) {
  let currentSearchTemp = document.querySelector("#temperature-today");
  let temperature = Math.round(response.data.main.temp);
  currentSearchTemp.innerHTML = `${temperature}`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
}
///Current geolocation
function myPosition(position) {
  let apiKey = "0fe8a8c3e267816d7e1a6e4de374af4d";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(urlWeather).then(showWeather);
}

function showWeather(response) {
  let currentgeoTemp = document.querySelector("#temperature-today");
  let temperature = Math.round(response.data.main.temp);
  currentgeoTemp.innerHTML = temperature;
  let currentGeoLocation = document.querySelector("#app-city");
  currentGeoLocation.innerHTML = response.data.name;
  let description = document.querySelector("#decription");
  description.innerHTML = response.data.weather[0].description;
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", myPosition);
navigator.geolocation.getCurrentPosition(myPosition);
 
