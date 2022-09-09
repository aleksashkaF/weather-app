function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                        <img 
                        src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png"
          alt=""
          width="42" 
          />
                        <div class="forecast-day">${formatDay(
                          forecastDay.dt
                        )}</div>
                        <div class="forecast-day-temperature">
                        <span class="weather-forecast-temperature-max"> ${Math.round(
                          forecastDay.temp.max
                        )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
          </div>
                    </div>
                    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp-number");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#fullDate");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", handleSubmit);

function celsiusConvert() {
  let number = document.querySelector("#temp-number");
  number.innerHTML = `${Math.round(celsiusTemperature)}°`;
}
function fahrenheitConvert() {
  let number = document.querySelector("#temp-number");
  let temp = number.innerHTML;
  number.innerHTML = `${Math.round((celsiusTemperature * 9) / 5 + 32)}°`;
}

let celsius = document.querySelector("#temp-c");
celsius.addEventListener("click", celsiusConvert);
let fahrenheit = document.querySelector("#temp-f");
fahrenheit.addEventListener("click", fahrenheitConvert);

function myLocation(position) {
  let latCur = position.coords.latitude;
  let lonCur = position.coords.longitude;
  let apiKey = "4dc0887c2005fed28cd005218db8cead";
  let units = "metric";
  let apiUrlCur = `https://api.openweathermap.org/data/2.5/weather?lat=${latCur}&lon=${lonCur}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlCur).then(displayTemperature);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(myLocation);
}
let button = document.querySelector("#my-location");
button.addEventListener("click", getLocation);

search("Amsterdam");
