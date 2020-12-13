//Capitalise first letter of first word
function properCase(inputVal) {
  let firstLetter = inputVal.substring(0, 1).toUpperCase();
  let theRest = inputVal.substring(1, (inputVal.length + 1));
  inputVal = firstLetter + theRest;
  return inputVal;
}



////NEW FUNCTION////
//Get wetaher icon for weather code
function weatherIcon(weatherId) {
    let currentWeatherImgNew = "fa-cloud-sun-rain";

  switch (weatherId) {
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
return currentWeatherImgNew
}




//////////////////////////GETTING LOCATION/////////////////////////////////////
////////////////////////////NEW FUNCTION///////////////////////////////////////
//Current Geo Location
function currGeoLoc(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(currentLocation);

}
////////////////////////////NEW FUNCTION///////////////////////////////////////




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
////////////////////////////NEW FUNCTION///////////////////////////////////////




//Search engine - search button event to search
function searchEngine(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input").value;
  
  if (cityInput === "") {
    alert("Please enter a city or place name.");
  } else {
  //let cityInputProper = properCase(cityInput);
  //let h1City = document.querySelector("#h1-city-name");
  //h1City.innerHTML = `${cityInputProper}`;

  let cityInputApi = cityInput.replace(" ", "+");

  getDeetsCity(cityInputApi);

  document.querySelector("#city-input").value = "";
  };
}







////////////////////////CREATING API CALLS/////////////////////////////////////
////////////////////////////NEW FUNCTION///////////////////////////////////////
//Gets latitude and longitude of current location of user
function currentLocation(response) {
  let lat = response.coords.latitude;
  let long = response.coords.longitude;

  getDeets(lat, long);
}
////////////////////////////NEW FUNCTION///////////////////////////////////////
//Processes API call when searching by currentlocation lat/long
//Error handling if city is unrecognised by API
function getDeets(lat, long) {
  let latitude = lat;
  let longitude = long;
  let apiKey = "d4005dcd287a291e84d25dc6afec0b1c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  
  let futureApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${apiKey}`;
  //Included as in training ids but not recognised when run so commented out
  //const axios = require("axios").default;

fetch(apiUrl)
   .then(function (response) {
      if(!response.ok) {
        throw Error(`City ${response.statusText}`);
   } else {
     axios.get(apiUrl).then(displayDeets);
     axios.get(futureApiUrl).then(displayDeetsFuture);
   };
  })
   .catch(function(err) {
     alert(`City not found, please try again.`);
   });
}
////////////////////////////NEW FUNCTION///////////////////////////////////////
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
     axios.get(apiUrl).then(getLatLong);
   };
  })
   .catch(function(err) {
     alert(`City not found, please try again.`);
   });
}
////////////////////////////NEW FUNCTION///////////////////////////////////////

//Getting lat and long from city search current weather api to pass to future forecast api
function getLatLong(apiCall) {
  let apiLatLong = apiCall;
  let latitude = apiLatLong.data.coord.lat;
  let longitude = apiLatLong.data.coord.lon;
  let apiKey = "d4005dcd287a291e84d25dc6afec0b1c";
  let units = "metric";
  let futureApiUrl =  `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${apiKey}`;

fetch(futureApiUrl)
   .then(function (response) {
      if(!response.ok) {
        throw Error(`City ${response.statusText}`);
   } else {
     axios.get(futureApiUrl).then(displayDeetsFuture);
    };
  })
   .catch(function(err) {
     alert(`City not found, please try again.`);
   });

}







////////////////////////UPDATING DETAILS ON SCREEN////////////////////////////

////////////////////////////NEW FUNCTION///////////////////////////////////////
//Updating the details displayed on the page including images for current weather
function displayDeets(apiCall) {
  let getTemp = apiCall;
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
  
  let centigradeSelect = document.querySelector("#centigrade-select");
  centigradeSelect.setAttribute("checked", true);

  let centigradeLabel = document.querySelector("#cent-label");
  centigradeLabel.classList.add("active");

  let farLabel = document.querySelector("#far-label");
  farLabel.classList.remove("active");

  let farenheitSelect = document.querySelector("#farenheit-select");
  farenheitSelect.removeAttribute("checked");
  

  //updating timestamp
  let timezone = getTemp.data.timezone;

  Date.prototype.addSecs = function(s) {
    this.setTime(this.getTime() + (s * 1000));
    return this;
  }

  let newDate = new Date();
  newDate.addSecs(timezone);

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
    "Wednesday",
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
  let currentWeatherImgNew = weatherIcon(weatherCode);

  currentWeatherImg.classList.replace(currentWeatherImg.className.substr(4, currentWeatherImg.className.length), currentWeatherImgNew);
}
////////////////////////////NEW FUNCTION///////////////////////////////////////
//Future forecast details update
function displayDeetsFuture(apiCall) {
  let getFutureTemp = apiCall;
  
 //Current Day
  let dateTimeNow = new Date();
  let currentDay = dateTimeNow.getDay();

  //Day1 Forecast
  let day1DayNo = currentDay + 1;
  if(day1DayNo > 6) {
    day1DayNo === day1DayNo - 7;
  };
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wesnesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  day1DayWord = days[day1DayNo];

  let day1Title = document.querySelector("#day-1-title");
  day1Title.innerHTML = day1DayWord;

  let day1WeatherImg = document.querySelector("#day-1-img");
  let weatherCode = getFutureTemp.data.daily[0].weather[0].icon;
  let weatherImgDay1 = weatherIcon(weatherCode);
  day1WeatherImg.classList.replace(day1WeatherImg.className.substr(4, day1WeatherImg.className.length), weatherImgDay1);

  let day1MaxField = document.querySelector("#day-1-max-min");
  let day1MaxTemp = Math.round(getFutureTemp.data.daily[0].temp.max);
  let day1MinTemp = Math.round(getFutureTemp.data.daily[0].temp.min);
  day1MaxField.innerHTML = `${day1MinTemp}°C/${day1MaxTemp}°C`

  //Day2 Forecast
  let day2DayNo = currentDay + 2;
  if(day2DayNo > 6) {
    day2DayNo === day2DayNo -7;
  };
  day2DayWord = days[day2DayNo];

  let day2Title = document.querySelector("#day-2-title");
  day2Title.innerHTML = day2DayWord;

  let day2WeatherImg = document.querySelector("#day-2-img");
  weatherCode = getFutureTemp.data.daily[1].weather[0].icon;
  let weatherImgDay2 = weatherIcon(weatherCode);
  day2WeatherImg.classList.replace(day2WeatherImg.className.substr(4, day2WeatherImg.className.length), weatherImgDay2);

  let day2MaxField = document.querySelector("#day-2-max-min");
  let day2MaxTemp = Math.round(getFutureTemp.data.daily[1].temp.max);
  let day2MinTemp = Math.round(getFutureTemp.data.daily[1].temp.min);
  day2MaxField.innerHTML = `${day2MinTemp}°C/${day2MaxTemp}°C`


  //Day3 Forecast
  let day3DayNo = currentDay + 3;
  if(day3DayNo > 6) {
    day3DayNo === day3DayNo - 7;
  };
  day3DayWord = days[day3DayNo];

  let day3Title = document.querySelector("#day-3-title");
  day3Title.innerHTML = day3DayWord;

  let day3WeatherImg = document.querySelector("#day-3-img");
  weatherCode = getFutureTemp.data.daily[2].weather[0].icon;
  let weatherImgDay3 = weatherIcon(weatherCode);
  day3WeatherImg.classList.replace(day3WeatherImg.className.substr(4, day3WeatherImg.className.length), weatherImgDay3);

  let day3MaxField = document.querySelector("#day-3-max-min");
  let day3MaxTemp = Math.round(getFutureTemp.data.daily[2].temp.max);
  let day3MinTemp = Math.round(getFutureTemp.data.daily[2].temp.min);
  day3MaxField.innerHTML = `${day3MinTemp}°C/${day3MaxTemp}°C`

  //Day4 Forecast
  let day4DayNo = currentDay + 4;
  if(day4DayNo > 6) {
    day4DayNo === day4DayNo - 7;
  };
  day4DayWord = days[day4DayNo];

  let day4Title = document.querySelector("#day-4-title");
  day4Title.innerHTML = day4DayWord;

  let day4WeatherImg = document.querySelector("#day-4-img");
  weatherCode = getFutureTemp.data.daily[3].weather[0].icon;
  let weatherImgDay4 = weatherIcon(weatherCode);
  day4WeatherImg.classList.replace(day4WeatherImg.className.substr(4, day4WeatherImg.className.length), weatherImgDay4);

  let day4MaxField = document.querySelector("#day-4-max-min");
  let day4MaxTemp = Math.round(getFutureTemp.data.daily[3].temp.max);
  let day4MinTemp = Math.round(getFutureTemp.data.daily[3].temp.min);
  day4MaxField.innerHTML = `${day4MinTemp}°C/${day4MaxTemp}°C`

//Day5 Forecast
  let day5DayNo = currentDay + 5;
  if(day5DayNo > 6) {
    day5DayNo === day5DayNo - 7;
  };
  day5DayWord = days[day5DayNo];

  let day5Title = document.querySelector("#day-5-title");
  day5Title.innerHTML = day5DayWord;

  let day5WeatherImg = document.querySelector("#day-5-img");
  weatherCode = getFutureTemp.data.daily[4].weather[0].icon;
  let weatherImgDay5 = weatherIcon(weatherCode);
  day5WeatherImg.classList.replace(day5WeatherImg.className.substr(4, day5WeatherImg.className.length), weatherImgDay5);

  let day5MaxField = document.querySelector("#day-5-max-min");
  let day5MaxTemp = Math.round(getFutureTemp.data.daily[4].temp.max);
  let day5MinTemp = Math.round(getFutureTemp.data.daily[4].temp.min);
  day5MaxField.innerHTML = `${day5MinTemp}°C/${day5MaxTemp}°C`


}



/////////////////////UPDATING TEMPERATURES/////////////////////////////////////
////////////////////////////NEW FUNCTION///////////////////////////////////////
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

  //Day 1 forecast to farenheit
  let day1TempDesc = document.querySelector("#day-1-max-min").innerHTML;
  let slashLoc = day1TempDesc.search("/");

  let day1Min = day1TempDesc.substr(0, slashLoc-2);
  day1Min = Math.round((day1Min * (9/5))+32);
  
  let day1Max = day1TempDesc.substring(slashLoc+1, ((day1TempDesc.length)-2));
  day1Max = Math.round((day1Max * (9/5))+32);

  let day1TempUpdate = document.querySelector("#day-1-max-min");
  day1TempUpdate.innerHTML = `${day1Min}°F/${day1Max}°F`;

  //Day 2 forecast to farenheit
  let day2TempDesc = document.querySelector("#day-2-max-min").innerHTML;
  let slashLoc2 = day2TempDesc.search("/");

  let day2Min = day2TempDesc.substr(0, slashLoc2-2);
  day2Min = Math.round((day2Min * (9/5))+32);
  
  let day2Max = day2TempDesc.substring(slashLoc2+1, ((day2TempDesc.length)-2));
  day2Max = Math.round((day2Max * (9/5))+32);

  let day2TempUpdate = document.querySelector("#day-2-max-min");
  day2TempUpdate.innerHTML = `${day2Min}°F/${day2Max}°F`;

  //Day 3 forecast to farenheit
  let day3TempDesc = document.querySelector("#day-3-max-min").innerHTML;
  let slashLoc3 = day3TempDesc.search("/");

  let day3Min = day3TempDesc.substr(0, slashLoc3-2);
  day3Min = Math.round((day3Min * (9/5))+32);
  
  let day3Max = day3TempDesc.substring(slashLoc3+1, ((day3TempDesc.length)-2));
  day3Max = Math.round((day3Max * (9/5))+32);

  let day3TempUpdate = document.querySelector("#day-3-max-min");
  day3TempUpdate.innerHTML = `${day3Min}°F/${day3Max}°F`;

  //Day 4 forecast to farenheit
  let day4TempDesc = document.querySelector("#day-4-max-min").innerHTML;
  let slashLoc4 = day4TempDesc.search("/");

  let day4Min = day4TempDesc.substr(0, slashLoc4-2);
  day4Min = Math.round((day4Min * (9/5))+32);
  
  let day4Max = day4TempDesc.substring(slashLoc4+1, ((day4TempDesc.length)-2));
  day4Max = Math.round((day4Max * (9/5))+32);

  let day4TempUpdate = document.querySelector("#day-4-max-min");
  day4TempUpdate.innerHTML = `${day4Min}°F/${day4Max}°F`;

  //Day 5 forecast to farenheit
  let day5TempDesc = document.querySelector("#day-5-max-min").innerHTML;
  let slashLoc5 = day5TempDesc.search("/");

  let day5Min = day5TempDesc.substr(0, slashLoc5-2);
  day5Min = Math.round((day5Min * (9/5))+32);
  
  let day5Max = day5TempDesc.substring(slashLoc5+1, ((day5TempDesc.length)-2));
  day5Max = Math.round((day5Max * (9/5))+32);

  let day5TempUpdate = document.querySelector("#day-5-max-min");
  day5TempUpdate.innerHTML = `${day5Min}°F/${day5Max}°F`;
}
////////////////////////////NEW FUNCTION///////////////////////////////////////
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

    //Day 1 forecast to celsius
  let day1TempDesc = document.querySelector("#day-1-max-min").innerHTML;
  let slashLoc = day1TempDesc.search("/");

  let day1Min = day1TempDesc.substr(0, slashLoc-2);
  day1Min = Math.round((day1Min - 32)*(5/9));;
  
  let day1Max = day1TempDesc.substring(slashLoc+1, ((day1TempDesc.length)-2));
  day1Max = Math.round((day1Max - 32)*(5/9));

  let day1TempUpdate = document.querySelector("#day-1-max-min");
  day1TempUpdate.innerHTML = `${day1Min}°C/${day1Max}°C`;

  //Day 2 forecast to celsius
  let day2TempDesc = document.querySelector("#day-2-max-min").innerHTML;
  let slashLoc2 = day2TempDesc.search("/");

  let day2Min = day2TempDesc.substr(0, slashLoc2-2);
  day2Min = Math.round((day2Min - 32)*(5/9));;
  
  let day2Max = day2TempDesc.substring(slashLoc2+1, ((day2TempDesc.length)-2));
  day2Max = Math.round((day2Max - 32)*(5/9));

  let day2TempUpdate = document.querySelector("#day-2-max-min");
  day2TempUpdate.innerHTML = `${day2Min}°C/${day2Max}°C`;

  //Day 3 forecast to celsius
  let day3TempDesc = document.querySelector("#day-3-max-min").innerHTML;
  let slashLoc3 = day3TempDesc.search("/");

  let day3Min = day3TempDesc.substr(0, slashLoc3-2);
  day3Min = Math.round((day3Min - 32)*(5/9));
  
  let day3Max = day3TempDesc.substring(slashLoc3+1, ((day3TempDesc.length)-2));
  day3Max = Math.round((day3Max - 32)*(5/9));

  let day3TempUpdate = document.querySelector("#day-3-max-min");
  day3TempUpdate.innerHTML = `${day3Min}°C/${day3Max}°C`;

  //Day 4 forecast to celsius
  let day4TempDesc = document.querySelector("#day-4-max-min").innerHTML;
  let slashLoc4 = day4TempDesc.search("/");

  let day4Min = day4TempDesc.substr(0, slashLoc4-2);
  day4Min = Math.round((day4Min - 32)*(5/9));;
  
  let day4Max = day4TempDesc.substring(slashLoc4+1, ((day4TempDesc.length)-2));
  day4Max = Math.round((day4Max - 32)*(5/9));

  let day4TempUpdate = document.querySelector("#day-4-max-min");
  day4TempUpdate.innerHTML = `${day4Min}°C/${day4Max}°C`;

  //Day 5 forecast to celsius
  let day5TempDesc = document.querySelector("#day-5-max-min").innerHTML;
  let slashLoc5 = day5TempDesc.search("/");

  let day5Min = day5TempDesc.substr(0, slashLoc5-2);
  day5Min = Math.round((day5Min - 32)*(5/9));
  
  let day5Max = day5TempDesc.substring(slashLoc5+1, ((day5TempDesc.length)-2));
  day5Max = Math.round((day5Max - 32)*(5/9));

  let day5TempUpdate = document.querySelector("#day-5-max-min");
  day5TempUpdate.innerHTML = `${day5Min}°C/${day5Max}°C`;


}








/////////////////////////PAGE SETUP DETAILS//////////////////////////////////////

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
  "Wednesday",
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


////////////////////////////NEW PROCESSES///////////////////////////////////////
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


