let date = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = date.getDay();
let dayOfWeek = days[day];

let daysDate = date.getDate();

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
let month = months[date.getMonth()];
let year = date.getFullYear();

let hour = date.getHours();
let minute = date.getMinutes();

let weatherDate = document.querySelector(".date");
weatherDate.innerHTML = `${dayOfWeek}, ${daysDate} <sup>th</sup> of ${month}, ${year} ${hour}:${minute}`;

function displayWeatherCondition(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#tempValue").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function showSearchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showCurrentCityDisplay(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showSearchLocation);
}

function displaySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

let currentCity = document.querySelector("#currentCity");
currentCity.addEventListener("click", showCurrentCityDisplay);

let mySearch = document.querySelector("#search");
mySearch.addEventListener("submit", displaySearch);

search("Enugu");
