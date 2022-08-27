let currentDay = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDay.getDay()];
let today = document.querySelector("#day");
today.innerHTML = `${day}`;
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
  "December",
];
let month = months[currentDay.getMonth()];
let date = currentDay.getDate();
let hours = currentDay.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentDay.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${date} ${month} ${hours}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp-number");
  temperatureElement.innerHTML = temperature;
  let city = document.querySelector("#location");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity} %`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed} km/h`;
}

function myLocation(position) {
  let latCur = position.coords.latitude;
  let lonCur = position.coords.longitude;
  let apiKey = "4dc0887c2005fed28cd005218db8cead";
  let units = "metric";
  let apiUrlCur = `https://api.openweathermap.org/data/2.5/weather?lat=${latCur}&lon=${lonCur}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlCur).then(showTemperature);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(myLocation);
}
let button = document.querySelector("#my-location");
button.addEventListener("click", getLocation);

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let currentCity = document.querySelector("#location");
  currentCity.innerHTML = input.value;
  let apiKey = "4dc0887c2005fed28cd005218db8cead";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#location-form");
form.addEventListener("submit", changeCity);
