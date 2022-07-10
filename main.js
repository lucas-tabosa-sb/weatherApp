'use strict'
// search elements and CTA
const app = document.querySelector('.app')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')

// text elements
const cityResult = document.querySelector('.city-name')
const tempIcon = document.querySelector('.temp-icon')
const currentTemp = document.querySelector('.current-temperature')
const minTemp = document.querySelector('.min-temperature')
const maxTemp = document.querySelector('.max-temperature')
const tempFeeling = document.querySelector('.temp-feeling')
const humidity = document.querySelector('.humidity')

// card + select card
const currentCard = document.querySelector('.weather-container')
const forecastCard = document.querySelector('.forecast-container')
const selectForecast = document.querySelector('.select-forecast')
const selectCurrent = document.querySelector('.select-current')


const apiKey = "bf06a835de048cf99b1e976427cd94f2"

const getCurrent = async function getWeather(){

    const cityOption = `${searchInput.value ? searchInput.value : 'fortaleza' }`

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityOption}&appid=${apiKey}&units=metric`

    const response = await fetch(apiURL)
    const current = await response.json()

    const iconURL = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`

    cityResult.textContent = `${current.name} - ${current.sys.country}`
    currentTemp.textContent = `${Math.floor(current.main.temp)}℃`
    minTemp.textContent = `Min: ${Math.floor(current.main.temp_min)}℃`
    maxTemp.textContent = `Max: ${Math.floor(current.main.temp_max)}℃`
    tempFeeling.textContent = `${Math.floor(current.main.feels_like)}℃`
    humidity.textContent = `${Math.floor(current.main.humidity)}%`
    tempIcon.src = iconURL

    // TO-DO -> work on dynamic bg change
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

    

}


selectForecast.addEventListener('click', function(){
    currentCard.classList.add('hidden')
})

selectCurrent.addEventListener('click', function(){
    currentCard.classList.remove('hidden')
})



getCurrent()
searchBtn.addEventListener('click', getCurrent)