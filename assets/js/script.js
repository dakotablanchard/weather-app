var date = document.querySelector("#date")
var apiKey = "b3b885146dce3d4c2a9d8e921432d8fb"
var today = dayjs()

var locationEl = document.getElementById("location")
var currentTempEl = document.getElementById("current-temp")
var currentWindEl = document.getElementById("current-wind")
var currentHumidityEl = document.getElementById("current-humidity")

var currentWeatherArray = []

// Set current date on screen using dayjs
date.textContent = today.format("MMMM D, YYYY")


function searchCity() { 
    var zipCode = document.querySelector("#zip-search").value
    var getCoordinates = "http://api.openweathermap.org/geo/1.0/zip?zip=" + zipCode + ",US&appid=" + apiKey

    fetch(getCoordinates)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data.lat
            var lon = data.lon
            getCurrentWeather(lat, lon)
        });
        
        
    }
    
function getCurrentWeather(lat, lon) {
        var currentWeatherEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"

        fetch(currentWeatherEndpoint)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var location = data.name
            var currentTemp = data.main.temp + " °F"
            var currentWind = data.wind.speed + " MPH"
            var currentHumidity = data.main.humidity + "%"
            console.log(data.name)
            logCurrentWeather(location, currentTemp, currentWind, currentHumidity)
        });

}

function logCurrentWeather(location, temp, wind, humidity) {
    locationEl.textContent = location
    currentTempEl.textContent = temp
    currentWindEl.textContent = wind
    currentHumidityEl.textContent = humidity
}
