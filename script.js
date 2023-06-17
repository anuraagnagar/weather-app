"use strict";

const params = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "414a69c07amsh153a86fe463d3a3p19493bjsn9c1f859c27ba",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

document.getElementById("current-time").innerHTML = new Date()
  .toLocaleTimeString()
  .toUpperCase();
document.getElementById("current-date").innerHTML = new Date()
  .toLocaleDateString()
  .toUpperCase();

const data = {
  cloud_pct: 0,
  feels_like: 28,
  humidity: 17,
  max_temp: 30,
  min_temp: 30,
  sunrise: 1676510569,
  sunset: 1676551588,
  temp: 30,
  wind_degrees: 300,
  wind_speed: 5.66,
};

// Week days object.
const days = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const dropDown = () => {
  document.getElementById("dd-list").classList.toggle("dropdown-list");
};

// Displaying the date time string into the HTML document.
const showCurrentDateTime = () => {
  // Show current date.
  let dateArray = new Date().toDateString().split(" ");
  let dateString = `${days[dateArray[0]]}, ${dateArray[2]} ${dateArray[1]} ${
    dateArray[3]
  }`;
  document.getElementById("current-date").innerHTML = dateString;
  // Show current time.
  const getTime = () => {
    let time = new Date().toLocaleTimeString().toUpperCase();
    document.getElementById("current-time").innerHTML = time;
    return time;
  };
  setInterval(getTime, 1000);
};
showCurrentDateTime();

// Displaying the sunrise & sunset time into the HTML document.
const showSunriseSunset = (sunrise, sunset) => {
  let sunriseTime = new Date(sunrise * 1000).toLocaleTimeString().toUpperCase();
  let sunsetTime = new Date(sunset * 1000).toLocaleTimeString().toUpperCase();
  document.querySelector("#sun-rise").innerHTML = sunriseTime;
  document.querySelector("#sun-set").innerHTML = sunsetTime;
};

// Displaying weather information into the HTML document.
const showWeatherData = (data) => {
  document.getElementById("feel-like").innerHTML = `${data.feels_like}`;
  document.getElementById("tempreture").innerHTML = `${data.temp}`;
  document.getElementById("humidity").innerHTML = `${data.humidity}%`;
  document.getElementById("wind-speed").innerHTML = `${data.wind_speed}km/h`;
  showSunriseSunset(data.sunrise, data.sunset);
};

//  Fetching data from an Rapid API.
async function fetchData(city) {
  let URL = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  let res = await fetch(URL, params)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);
  return res;
}

async function checkData(city) {
  let getLocalStorageItem = localStorage.getItem(
    `${city} weather`.toLowerCase()
  );
  if (getLocalStorageItem) {
    let parseData = JSON.parse(getLocalStorageItem);
    showWeatherData(parseData);
  } else {
    let data = await fetchData(city);
    if (!data.error) {
      localStorage.setItem(
        `${city} weather`.toLowerCase(),
        JSON.stringify(data)
      );
      showWeatherData(data);
    } else {
      console.log("Please Enter Correct City Name");
    }
  }
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let search = document.getElementById("search-input");
  let check = checkData(search.value);
  search.value = "";
  return check;
});

showWeatherData(data);
