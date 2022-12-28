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

function temperatureValue(response) {
  let tempValue = document.querySelector("#tempValue");
  tempValue.innerHTML = response.data.main.temp;
}

function showSearch(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-input").value;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(temperatureValue);
}
let mySearch = document.querySelector("#search");
mySearch.addEventListener("submit", showSearch);

function showTemperature(response) {
  let myCurrentTemperature = response.data.main.temp;
  let tempValue = document.querySelector("span#tempValue");
  tempValue.innerHTML = Math.round(myCurrentTemperature);
}

function myLocation(position) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  console.log(position);
  let city = document.querySelector("h1#cityName");
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  city.innerHTML = "Enugu, Nigeria";
  let url = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&&units=metric&lat=${lat}&lon=${lon}`;
  axios.get(url).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(myLocation);
