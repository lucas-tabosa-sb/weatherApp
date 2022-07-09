const queryInput = document.getElementById('query-input')

const apiKey = 'afc999c5e2d7407ab1905841220907'
const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${queryInput.value}&aqi=no`


async function getCurrentWeather(){
    const response = await fetch(apiUrl)
    const currentWeather = await response.json()

    console.log(currentWeather)
}

console.log(queryInput.value)