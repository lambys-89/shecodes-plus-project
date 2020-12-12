function properCase(inputVal) {
  let firstLetter = inputVal.substring(0, 1).toUpperCase();
  let theRest = inputVal.substring(1, (inputVal.length + 1));
  inputVal = firstLetter + theRest;
  return inputVal;
}

function displayDeets(apiCall) {
  console.log(apiCall);
  let getTemp = apiCall;
  let country = getTemp.data.sys.country;
  let temp = Math.round(getTemp.data.main.temp);
  let descriptionCurrent = properCase(getTemp.data.weather[0].description);
  let feels = Math.round(getTemp.data.main.feels_like);
  let hum = getTemp.data.main.humidity;
  let wind = Math.round(getTemp.data.wind.speed);
  let cityName = getTemp.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}, ${country}`;
  let weatherCurrentTemp = document.querySelector(".temp");
  weatherCurrentTemp.innerHTML = `Currently: ${temp}°C`;
  let weatherCurrentDesc = document.querySelector(".type");
  weatherCurrentDesc.innerHTML = `${descriptionCurrent}`;
  let weatherCurrentFeels = document.querySelector(".feels");
  weatherCurrentFeels.innerHTML = `Feels like: ${feels}°C`;
  let weatherCurrentHum = document.querySelector(".hum");
  weatherCurrentHum.innerHTML = `Humidity: ${hum}%`;
  let weatherCurrentWind = document.querySelector(".wind");
  weatherCurrentWind.innerHTML = `Wind speed: ${wind}mph`;
}


function getDeets(lat, long) {
  let latitude = lat;
  let longitude = long;
  let apiKey = "d4005dcd287a291e84d25dc6afec0b1c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  //const axios = require("axios").default;

  axios.get(apiUrl).then(displayDeets);
}

function getDeetsCity(city) {
  let citySearch = city;
  let apiKey = "d4005dcd287a291e84d25dc6afec0b1c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=${units}&appid=${apiKey}`;
  //const axios = require("axios").default;

  axios.get(apiUrl).then(displayDeets);
}


function currentLocation(response) {
  let lat = response.coords.latitude;
  let long = response.coords.longitude;
  console.log(response);

  getDeets(lat, long);
}

function searchEngine(event) {
  event.preventDefault();

  console.log("Into searchEngine");

  
  let cityInput = document.querySelector("#city-input").value;
  let cityInputProper = properCase(cityInput);

  let h1City = document.querySelector("#h1-city-name");
  h1City.innerHTML = `${cityInputProper}`;

  let cityInputApi = cityInput.replace(" ", "+");

  getDeetsCity(cityInputApi);

  document.querySelector("#city-input").value = "";
  //Google Maps API
  //let googleApiKey = "AIzaSyAMHk00LwlJeA6obr1FUfcsrBrtZysF8pU";
  //let googleApiWeb = `https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${cityInputGoogle}`;

}

function currGeoLoc(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(currentLocation);

}

function measureChangeFar() {
  
  let centigradeSelect = document.querySelector("#centigrade-select");
  centigradeSelect.removeAttribute("checked");

  let centigradeLabel = document.querySelector("#cent-label");
  centigradeLabel.classList.remove("active");

  let farLabel = document.querySelector("#far-label");
  farLabel.classList.add("active");

  let farenheitSelect = document.querySelector("#farenheit-select");
  farenheitSelect.setAttribute("checked", true);

  let currentTempDisplay = document.querySelector(".temp").textContent;
  currentTempDisplay = currentTempDisplay.substring(10, ((currentTempDisplay.length)-2));
  currentTempDisplay = Math.round((currentTempDisplay * (9/5))+32);
  let weatherTempFar = document.querySelector(".temp");
  weatherTempFar.innerHTML = `Currently: ${currentTempDisplay}°F`;

  let currentTempFeels = document.querySelector(".feels").textContent;
  currentTempFeels = currentTempFeels.substring(12, ((currentTempFeels.length)-2));
  currentTempFeels = Math.round((currentTempFeels * (9/5))+32);
  let weatherTempFeelsFar = document.querySelector(".feels");
  weatherTempFeelsFar.innerHTML = `Feels like: ${currentTempFeels}°F`;
}
function measureChangeCel() {

  let centigradeSelect = document.querySelector("#centigrade-select");
  centigradeSelect.setAttribute("checked", true);

  let centigradeLabel = document.querySelector("#cent-label");
  centigradeLabel.classList.add("active");

  let farLabel = document.querySelector("#far-label");
  farLabel.classList.remove("active");

  let farenheitSelect = document.querySelector("#farenheit-select");
  farenheitSelect.removeAttribute("checked");

  let currentTempDisplay = document.querySelector(".temp").textContent;
  currentTempDisplay = currentTempDisplay.substring(10, ((currentTempDisplay.length)-2));
  currentTempDisplay = Math.round((currentTempDisplay - 32)*(5/9));
  let weatherTempCel = document.querySelector(".temp");
  weatherTempCel.innerHTML = `Currently: ${currentTempDisplay}°C`;

  let currentTempFeels = document.querySelector(".feels").textContent;
  currentTempFeels = currentTempFeels.substring(12, ((currentTempFeels.length)-2));
  currentTempFeels = Math.round((currentTempFeels - 32)*(5/9));
  let weatherTempFeelsCel = document.querySelector(".feels");
  weatherTempFeelsCel.innerHTML = `Feels like: ${currentTempFeels}°C`;
}

let dateTimeNow = new Date();
let day = dateTimeNow.getDay();
let hour = dateTimeNow.getHours();
let mins = dateTimeNow.getMinutes();
let year = dateTimeNow.getFullYear();
let dateNow = dateTimeNow.getDate();
let month = dateTimeNow.getMonth();
let dateApend = "th";
let mornAft = "AM";

if (dateNow === 1 || dateNow === 21 || dateNow === 31) {
  dateApend = "st";
} else {
  if (dateNow === 2 || dateNow === 22) {
    dateApend = "nd";
  } else {
    if (dateNow === 3 || dateNow === 22) {
      dateApend = "rd";
    }
  }
}

if (hour >= 12) {
  mornAft = "PM";
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wesnesday",
  "Thursday",
  "Friday",
  "Saturday"
];
day = days[day];

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
month = months[month];

if (mins < 10) {
  mins = `0${mins}`;
};

Let weatherCodes = [
  {
    code: "01d",
    imgRef: "fas fa-sun",
    background: "media/01d - vid.mp4"
  },
  {
    code: "02d",
    imgRef: "fas fa-cloud-sun",
    background: "media/02d - vid.mp4"
  },
  {
    code: "03d",
    imgRef: "fas fa-cloud",
    background: "media/03d - vid.mp4"
  },
  {
    code: "04d",
    imgRef: "fas fa-cloud",
    background: "media/04d - vid.mp4"
  },
  {
    code: "09d",
    imgRef: "fas fa-cloud-showers-heavy",
    background: "media/01d - vid.mp4"
    },
  {
    code: "10d",
    imgRef: "fas fa-cloud-showers-heavy",
    background: "media/10d - vid.mp4"
  },
  {
    code: "11d",
    imgRef: "fas fa-bolt",
    background: "media/11d - vid.mp4"
  },
  {
    code: "13d",
    imgRef: "fas fa-snowflake",
    background: "media/13d - vid.mp4"
  },
  {
    code: "50d",
    imgRef: "fas fa-smog",
    background: "media/50d - vid.mp4"
  }
]

window.addEventListener("load", currGeoLoc);

let dateField = document.querySelector("#current-date-time");
dateField.innerHTML = `${day} ${dateNow}${dateApend} ${month} ${year} ${hour}:${mins}${mornAft}`;

let citySearchForm = document.querySelector("#city-search"); 
citySearchForm.addEventListener("click", searchEngine);

let searchCurrentLocation = document.querySelector("#curr-location"); 
searchCurrentLocation.addEventListener("click", currGeoLoc);

let radioCel = document.querySelector("#centigrade-select");
radioCel.addEventListener("change", measureChangeCel);

let radioFar = document.querySelector("#farenheit-select");
radioFar.addEventListener("change", measureChangeFar);



