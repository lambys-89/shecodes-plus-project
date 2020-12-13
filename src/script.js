//Capitalise first letter of first word
function properCase(inputVal) {
  let firstLetter = inputVal.substring(0, 1).toUpperCase();
  let theRest = inputVal.substring(1, (inputVal.length + 1));
  inputVal = firstLetter + theRest;
  return inputVal;
}


//Updating the details displayed on the page including images 
function displayDeets(apiCall) {
  let getTemp = apiCall;
  console.log(getTemp);
  let country = getTemp.data.sys.country;
  let temp = Math.round(getTemp.data.main.temp);
  let descriptionCurrent = properCase(getTemp.data.weather[0].description);
  let feels = Math.round(getTemp.data.main.feels_like);
  let hum = getTemp.data.main.humidity;
  let wind = Math.round(getTemp.data.wind.speed);
  let cityName = getTemp.data.name;
  let weatherCode = getTemp.data.weather[0].icon;
  if (weatherCode.substr(2,1) === "n") {
    weatherCode = weatherCode.substr(0,2)+"d";
  };
  

  //updating timestamp
  let timezone = getTemp.data.timezone;
  console.log(timezone);

  Date.prototype.addSecs = function(s) {
    this.setTime(this.getTime() + (s * 1000));
    return this;
  }

  let newDate = new Date();
  newDate.addSecs(timezone);
  console.log(newDate);

  let newDay = newDate.getDay();
  let newHour = newDate.getHours();
  let newMins = newDate.getMinutes();
  let newYear = newDate.getFullYear();
  let newDateNow = newDate.getDate();
  let newMonth = newDate.getMonth();
  let newDateApend = "th";
  let newMornAft = "AM";


//Working out correct ending for utc date based on numeric value
//(defaults to "th" this updates where needed)
if (newDateNow === 1 || newDateNow === 21 || newDateNow === 31) {
  newDateApend = "st";
} else {
  if (newDateNow === 2 || newDateNow === 22) {
    newDateApend = "nd";
  } else {
    if (newDateNow === 3 || newDateNow === 22) {
      newDateApend = "rd";
    }
  }
}


//Check if afternoon
if (newHour >= 12) {
  newMornAft = "PM";
}


//array of days to be used to convert API numeric val to words
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wesnesday",
  "Thursday",
  "Friday",
  "Saturday"
];
newDay = days[newDay];

//array of months to be used to convert API numeric val to words
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
newMonth = months[newMonth];


// formatting for time stamp so mins < 10 start with 0
if (newMins < 10) {
  newMins = `0${newMins}`;
};


  //updating city name
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}, ${country}`;

let newDateField = document.querySelector("#current-date-time");
newDateField.innerHTML = `${newDay} ${newDateNow}${newDateApend} ${newMonth} ${newYear} ${newHour}:${newMins}${newMornAft}`;

  //updating details
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
  let backgroundVid = document.querySelector("video");
  backgroundVid.src = `media/${weatherCode}-vid.mp4`;
  let currentWeatherImg = document.querySelector("#current-weather-img");
  let currentWeatherImgNew = "fa-cloud-sun-rain";

  switch (weatherCode) {
    case "01d":
        currentWeatherImgNew = "fa-sun";
        break;
    case "02d":
        currentWeatherImgNew = "fa-cloud-sun";
        break;
    case "03d":
        currentWeatherImgNew = "fa-cloud";
        break;
    case "04d":
        currentWeatherImgNew = "fa-cloud";
        break;
    case "09d":
        currentWeatherImgNew = "fa-cloud-showers-heavy";
        break;
    case "10d":
        currentWeatherImgNew = "fa-cloud-showers-heavy";
        break;
    case "11d":
        currentWeatherImgNew = "fa-bolt";
        break;
    case "13d":
        currentWeatherImgNew = "fa-snowflake";
        break;
    case "50d":
        currentWeatherImgNew = "fa-smog";
        break;
    default: 
        currentWeatherImgNew = "fa-cloud-sun-rain";
  }
currentWeatherImg.classList.replace(currentWeatherImg.className.substr(4, currentWeatherImg.className.length), currentWeatherImgNew);
}



//Processes API call when searching by currentlocation lat/long
//Error handling if city is unrecognised by API
function getDeets(lat, long) {
  let latitude = lat;
  let longitude = long;
  let apiKey = "d4005dcd287a291e84d25dc6afec0b1c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  //Included as in training ids but not recognised when run so commented out
  //const axios = require("axios").default;

fetch(apiUrl)
   .then(function (response) {
      if(!response.ok) {
        throw Error(`City ${response.statusText}`);
   } else {
     axios.get(apiUrl).then(displayDeets);
   };
  })
   .catch(function(err) {
     console.log(err);
     alert(`City not found, please try again.`);
   });
}


//Processes API call when searching by city name
//Error handling if city is unrecognised by API
function getDeetsCity(city) {
  let citySearch = city;
  let apiKey = "d4005dcd287a291e84d25dc6afec0b1c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=${units}&appid=${apiKey}`;
  //Included as in training ids but not recognised when run so commented out
  //const axios = require("axios").default;
  
  
   fetch(apiUrl)
   .then(function (response) {
      if(!response.ok) {
        throw Error(`City ${response.statusText}`);
   } else {
     axios.get(apiUrl).then(displayDeets);
   };
  })
   .catch(function(err) {
     console.log(err);
     alert(`City not found, please try again.`);
   });
}



//Gets latitude and longitude of current location of user
function currentLocation(response) {
  let lat = response.coords.latitude;
  let long = response.coords.longitude;
  console.log(response);

  getDeets(lat, long);
}



//Search engine - search button event to search
function searchEngine(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input").value;
  
  if (cityInput === "") {
    alert("Please enter a city or place name.");
  } else {
  let cityInputProper = properCase(cityInput);

  //let h1City = document.querySelector("#h1-city-name");
  //h1City.innerHTML = `${cityInputProper}`;

  let cityInputApi = cityInput.replace(" ", "+");

  getDeetsCity(cityInputApi);

  document.querySelector("#city-input").value = "";
  };
}



//Search engine - enter key event to search
  function searchEngineEnter(event) {

  switch (event.key) {
    case "Enter":

  let cityInput = document.querySelector("#city-input").value;
  if (cityInput === "") {
    alert("Please enter a city or place name.");
  } else {
  let cityInputProper = properCase(cityInput);

  //let h1City = document.querySelector("#h1-city-name");
  //h1City.innerHTML = `${cityInputProper}`;

  let cityInputApi = cityInput.replace(" ", "+");

  getDeetsCity(cityInputApi);

  document.querySelector("#city-input").value = "";
  };
  break;

  default:
    return;
    };
    event.preventDefault();
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




//Getting and formatting details based on user's system info
let dateTimeNow = new Date();
let day = dateTimeNow.getDay();
let hour = dateTimeNow.getHours();
let mins = dateTimeNow.getMinutes();
let year = dateTimeNow.getFullYear();
let dateNow = dateTimeNow.getDate();
let month = dateTimeNow.getMonth();
let dateApend = "th";
let mornAft = "AM";
 


//Working out correct ending for date based on numeric value
//(defaults to "th" this updates where needed)
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


//Check if afternoon
if (hour >= 12) {
  mornAft = "PM";
}


//array of days to be used to convert API numeric val to words
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

//array of months to be used to convert API numeric val to words
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


// formatting for time stamp so mins < 10 start with 0
if (mins < 10) {
  mins = `0${mins}`;
};



//Event listeners for load, enter on search, click search, click current location,
// change to farenheit, change to celsius
window.addEventListener("load", currGeoLoc);

window.addEventListener("keydown", searchEngineEnter);

let citySearchForm = document.querySelector("#city-search"); 
citySearchForm.addEventListener("click", searchEngine);

let searchCurrentLocation = document.querySelector("#curr-location"); 
searchCurrentLocation.addEventListener("click", currGeoLoc);

let radioCel = document.querySelector("#centigrade-select");
radioCel.addEventListener("change", measureChangeCel);

let radioFar = document.querySelector("#farenheit-select");
radioFar.addEventListener("change", measureChangeFar);

//Updating current date and time of user
let dateField = document.querySelector("#current-date-time");
dateField.innerHTML = `${day} ${dateNow}${dateApend} ${month} ${year} ${hour}:${mins}${mornAft}`;


