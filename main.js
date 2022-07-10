const cityResult = document.getElementById('city-name-result')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')


const apiKey = "bf06a835de048cf99b1e976427cd94f2"

searchBtn.addEventListener('click', async function getWeather(){

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`
    
    const response = await fetch(apiURL)
    const weather = await response.json()

    console.log(weather)
    console.log(searchInput.value)
    
})

