const queryInput = document.getElementById('query-input')
const queryBtn = document.getElementById('query-button')

const apiKey = 'afc999c5e2d7407ab1905841220907'



queryBtn.addEventListener('click', async function getCurrentWeather(){

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${queryInput.value}&aqi=no`
    const response = await fetch(apiUrl)
    const currentWeather = await response.json()

    
})