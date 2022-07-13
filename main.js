"use strict";
// search elements and CTA
const app = document.querySelector(".app");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

// text elements
const cityResult = document.querySelector(".city-name");
const tempIcon = document.querySelector(".temp-icon");
const currentTemp = document.querySelector(".current-temperature");
const minTemp = document.querySelector(".min-temperature");
const maxTemp = document.querySelector(".max-temperature");
const tempFeeling = document.querySelector(".temp-feeling");
const humidity = document.querySelector(".humidity");

// card + select card
const currentCard = document.querySelector(".weather-container");
const forecastCard = document.querySelector(".forecast-container");
const selectForecast = document.querySelector(".select-forecast");
const selectCurrent = document.querySelector(".select-current");

const apiKey = "bf06a835de048cf99b1e976427cd94f2";

const getCurrent = async function getWeather() {
  const cityOption = `${searchInput.value ? searchInput.value : "fortaleza"}`;
  
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityOption}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiURL);

  if (response.status !== 200) {
    cityResult.textContent = "No results Found";
    currentTemp.textContent = "- ℃";
    minTemp.textContent = "- ℃";
    maxTemp.textContent = "- ℃";
    tempFeeling.textContent = "- ℃";
    humidity.textContent = "- %";
    tempIcon.src = "";
  }

  const current = await response.json();

  const iconURL = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

  cityResult.textContent = `${current.name}`; //${current.sys.country}
  currentTemp.textContent = `${Math.floor(current.main.temp)}℃`;
  minTemp.textContent = `Min: ${Math.floor(current.main.temp_min)}℃`;
  maxTemp.textContent = `Max: ${Math.floor(current.main.temp_max)}℃`;
  tempFeeling.textContent = `${Math.floor(current.main.feels_like)}℃`;
  humidity.textContent = `${Math.floor(current.main.humidity)}%`;
  tempIcon.src = iconURL;

  // TODO -> work on dynamic bg change
  /*
    const weatherId = current.weather[0].id

    if (weatherId >= 200 && weatherId <=232){
        app.removeAttribute('class')
        app.classList.add('app', 'storm')
    } else if (weatherId >= 300 && weatherId <=531){
        app.removeAttribute('class')
        app.classList.add('app', 'rain')
    } else if (weatherId >= 600 && weatherId <=622){
        app.removeAttribute('class')
        app.classList.add('app', 'snowing')
    } else if (weatherId >= 701 && weatherId <=781){
        app.removeAttribute('class')
        app.classList.add('app' ,'mist')
    } else if (weatherId >= 800 && weatherId <=804){
        app.removeAttribute('class')
        app.classList.add('app' ,'sunny')
    }
    */
};

const getForecast = async function getForecastReq(){
  const cityOption = `${searchInput.value ? searchInput.value : "fortaleza"}`;

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityOption}&appid=${apiKey}`
  const response = await fetch(forecastUrl)
  const forecast = await response.json()


  // whole list of 40 items
  let forecastList = forecast.list
  // maps the 40 items -> returns an array of 40 items
  let forecastDates = forecastList.map(items => {
    
    let s = items.dt
    let dateStr = new Date(0)
    dateStr.setUTCSeconds(s)
    
    return String(dateStr).split(' ')[0] // takes day of the week ou of full date string
  })

 
  console.log(forecastDates[4]) // first day of forecast
  console.log(forecastDates[12]) // 2-day forecast
  console.log(forecastDates[20]) // 3-day forecast
  console.log(forecastDates[28]) // 4-day forecast
  console.log(forecastDates[36]) // 5-day forecast

  // let seconds = forecast.list[0].dt
  // let date = new Date(0)
  // date.setUTCSeconds(seconds)

  // console.log(date, seconds)
}


// event handlers

// TODO -> FINISH CURRENT AND FORECAST CARDS
selectForecast.addEventListener('click', function(){
    currentCard.classList.add('hidden')
    forecastCard.classList.remove('hidden')
})

selectCurrent.addEventListener('click', function(){
    currentCard.classList.remove('hidden')
    forecastCard.classList.add('hidden')
})

selectForecast.addEventListener('click', getForecast)


// when page loads
getCurrent();

// when search button is clicked
searchBtn.addEventListener("click", getCurrent);

// enter keyboard ENTER is hit
searchInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchBtn.click();
  }
});
