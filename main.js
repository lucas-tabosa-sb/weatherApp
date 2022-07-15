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

// forecast elements
const forecastCity = document.querySelector('.forecast-city-name')
const forecastCurrentTemp = document.querySelector('.forecast-current-temperature')
const forecastTempIcon = document.querySelector('.forecast-temp-icon')
const forecastCardMid = document.querySelector('.forecast-card-mid')
const forecastSearchInput = document.getElementById("forecast-search-input");
const forecastSearchBtn = document.getElementById("forecast-search-button");

// card + select card / hide the other
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
  const cityOption = `${forecastSearchInput.value ? forecastSearchInput.value : "fortaleza"}`;

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityOption}&appid=${apiKey}&units=metric`
  const response = await fetch(forecastUrl)
  const forecast = await response.json()


  // whole list of 40 items
  let forecastList = forecast.list

  // maps the 40 items -> returns an array of 40 full dates
  let forecastDates = forecastList.map(items => {
    let s = items.dt
    let dateStr = new Date(0)
    dateStr.setUTCSeconds(s)

    return String(dateStr).split(' ')[0] // takes day of the week ou of full date string (each array)
  })

  // takes the 40 items and returns the icon from the weather attribute
  let forecastIcons = forecastList.map(icons => {
    return icons.weather[0].icon
  })

  // temperatures each day of the week
  let forecastTemp = forecastList.map(items =>{
    return Math.floor(items.main.temp)
  })

  /*
    logging the desired days of week 5 days from the current date + respective weather icons
    console.log(forecastDates[4]) -> first day of forecast
    console.log(forecastIcons[4]) -> 1 day icon
    console.log(forecastTemp[4])

    TODO REFACTOR MARKUP
    gets 5 days, weather icons, temperatures, from the current date, at noon
    const daysOfWeek = [forecastDates[4], forecastDates[12], forecastDates[20], forecastDates[28], forecastDates[36]]
    const tempsOfWeek = [forecastTemp[4], forecastTemp[12], forecastTemp[20], forecastTemp[28], forecastTemp[36]]
    const weekDaysIcons = [forecastIcons[4], forecastIcons[12], forecastIcons[20], forecastIcons[28], forecastIcons[36]]
  */


// populating HTML:
  forecastCity.textContent = `${cityOption}, `
  forecastCurrentTemp.textContent = currentTemp.textContent
  forecastTempIcon.src = tempIcon.src


  const markup = `
  <div class="weekday-container">
    <p class="weekday">${forecastDates[4]}:</p>
    <span class="forecast-weather">${forecastTemp[4]}℃</span>
    <img src="http://openweathermap.org/img/wn/${forecastIcons[0]}@2x.png" alt="" class="forecast-temp-icon" />
  </div>
  <div class="weekday-container">
    <p class="weekday">${forecastDates[12]}:</p>
    <span class="forecast-weather">${forecastTemp[12]}℃</span>
    <img src="http://openweathermap.org/img/wn/${forecastIcons[0]}@2x.png" alt="" class="forecast-temp-icon" />
  </div>
  <div class="weekday-container">
    <p class="weekday">${forecastDates[20]}:</p>
    <span class="forecast-weather">${forecastTemp[20]}℃</span>
    <img src="http://openweathermap.org/img/wn/${forecastIcons[0]}@2x.png" alt="" class="forecast-temp-icon" />
  </div>
  <div class="weekday-container">
    <p class="weekday">${forecastDates[28]}:</p>
    <span class="forecast-weather">${forecastTemp[28]}℃</span>
    <img src="http://openweathermap.org/img/wn/${forecastIcons[0]}@2x.png" alt="" class="forecast-temp-icon" />
  </div>
  <div class="weekday-container">
    <p class="weekday">${forecastDates[36]}:</p>
    <span class="forecast-weather">${forecastTemp[36]}℃</span>
    <img src="http://openweathermap.org/img/wn/${forecastIcons[0]}@2x.png" alt="" class="forecast-temp-icon" />
  </div>
  `

  forecastCardMid.innerHTML += markup
  selectForecast.disabled = true

  // END OF GET FORECAST
}


//    EVENT HANDLERS

// TODO -> FINISH CURRENT AND FORECAST CARDS
selectForecast.addEventListener('click', function(){
    currentCard.classList.add('hidden')
    forecastCard.classList.remove('hidden')
})

selectCurrent.addEventListener('click', function(){
    currentCard.classList.remove('hidden')
    forecastCard.classList.add('hidden')
    selectForecast.disabled = false
    forecastCardMid.innerHTML= ''
})

selectForecast.addEventListener('click', getForecast)

// search button on forecast page
// forecastSearchBtn.addEventListener('click', getForecast)
forecastSearchBtn.addEventListener('click', function(){
  forecastCardMid.innerHTML= ''
  getForecast()
})
// forecastSearchInput.addEventListener




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

forecastSearchInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    forecastSearchBtn.click();
  }
});
