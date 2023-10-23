// Set current date on screen using dayjs.
var today = dayjs()
var date = document.querySelector("#date")
date.textContent = today.format("MMMM D, YYYY")

// Open Weather API key:
var apiKey = "b3b885146dce3d4c2a9d8e921432d8fb"

var locationEl = document.getElementById("location")
var currentTempEl = document.getElementById("current-temp")
var currentWindEl = document.getElementById("current-wind")
var currentHumidityEl = document.getElementById("current-humidity")
var currentIconEl = document.getElementById("current-icon")

var searchBarEl = document.querySelector(".search-city")
var mainContainter = document.querySelector(".container")

// Setting all the DOM elements as variables from the forecast-container:
var day1DateEl = document.getElementById("day-1-date")
day1DateEl.textContent = today.add(1, 'day').format('MMMM D, YYYY')
var day1IconEl = document.getElementById("day-1-icon")
var day1TempEl = document.getElementById("day-1-temp")
var day1WindEl = document.getElementById("day-1-wind")
var day1HumidEl = document.getElementById("day-1-humidity")

var day2DateEl = document.getElementById("day-2-date")
day2DateEl.textContent = today.add(2, 'day').format('MMMM D, YYYY')
var day2IconEl = document.getElementById("day-2-icon")
var day2TempEl = document.getElementById("day-2-temp")
var day2WindEl = document.getElementById("day-2-wind")
var day2HumidEl = document.getElementById("day-2-humidity")

var day3DateEl = document.getElementById("day-3-date")
day3DateEl.textContent = today.add(3, 'day').format('MMMM D, YYYY')
var day3IconEl = document.getElementById("day-3-icon")
var day3TempEl = document.getElementById("day-3-temp")
var day3WindEl = document.getElementById("day-3-wind")
var day3HumidEl = document.getElementById("day-3-humidity")

var day4DateEl = document.getElementById("day-4-date")
day4DateEl.textContent = today.add(4, 'day').format('MMMM D, YYYY')
var day4IconEl = document.getElementById("day-4-icon")
var day4TempEl = document.getElementById("day-4-temp")
var day4WindEl = document.getElementById("day-4-wind")
var day4HumidEl = document.getElementById("day-4-humidity")

var day5DateEl = document.getElementById("day-5-date")
day5DateEl.textContent = today.add(5, 'day').format('MMMM D, YYYY')
var day5IconEl = document.getElementById("day-5-icon")
var day5TempEl = document.getElementById("day-5-temp")
var day5WindEl = document.getElementById("day-5-wind")
var day5HumidEl = document.getElementById("day-5-humidity")

// This array will hold objects containing location and zip code from what the user searches.
var recentSearchArray = []


// This variable will store the value of that the user types.
var typeZipCode = document.querySelector("#zip-search")

// This function is linked to the search button, telling it to start the chain
// of functions that will retrieve our data using what the user has typed.
function searchBox() {

    searchCity(typeZipCode.value)
}

// In order to get weather info from open weather, we first have to get the 
// coordinates of our location using the US zip code. That is what this 
// searchCity() function is doing.
function searchCity(zip) {
    mainContainter.style.display = ""

    var getCoordinates = "https://api.openweathermap.org/geo/1.0/zip?zip=" + zip + ",US&appid=" + apiKey

    fetch(getCoordinates)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data.lat
            var lon = data.lon
            getCurrentWeather(lat, lon, zip)
            fiveDayForecast(lat, lon)
        });

}

// The this function will take our the coordinates and grab current info on the
// location and it's current weather.
function getCurrentWeather(lat, lon, zip) {
    var currentWeatherEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"

    fetch(currentWeatherEndpoint)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var location = data.name
            var icon = data.weather[0].icon
            var currentTemp = data.main.temp + " °F"
            var currentWind = data.wind.speed + " MPH"
            var currentHumidity = data.main.humidity + "%"
            recentSearchArray.push({ location: location, zip: zip });
            localStorage.setItem("Zip-Code", JSON.stringify(recentSearchArray))
            logCurrentWeather(location, icon, currentTemp, currentWind, currentHumidity)
        });

}

// This function will take the data that we have retrieved from the API and log 
// it to the current-conditions container.
function logCurrentWeather(location, icon, temp, wind, humidity) {
    locationEl.textContent = location
    currentIconEl.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    currentTempEl.textContent = temp
    currentWindEl.textContent = wind
    currentHumidityEl.textContent = humidity

    recentSearches(location)

}

// The this function will take our the coordinates and grab info on the
// locations weather for the next 5 days.
function fiveDayForecast(lat, lon) {
    var futureCastAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"

    fetch(futureCastAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var day1 = data.list[3]
            var day2 = data.list[11]
            var day3 = data.list[19]
            var day4 = data.list[27]
            var day5 = data.list[35]
            logFiveDayForecast(day1, day2, day3, day4, day5)
        });
}

// This function will take the data that we have retrieved from the API and log 
// it to the forecast-container.
function logFiveDayForecast(day1, day2, day3, day4, day5) {
    day1IconEl.src = "https://openweathermap.org/img/wn/" + day1.weather[0].icon + "@2x.png"
    day2IconEl.src = "https://openweathermap.org/img/wn/" + day2.weather[0].icon + "@2x.png"
    day3IconEl.src = "https://openweathermap.org/img/wn/" + day3.weather[0].icon + "@2x.png"
    day4IconEl.src = "https://openweathermap.org/img/wn/" + day4.weather[0].icon + "@2x.png"
    day5IconEl.src = "https://openweathermap.org/img/wn/" + day5.weather[0].icon + "@2x.png"

    day1TempEl.textContent = day1.main.temp + " °F"
    day2TempEl.textContent = day2.main.temp + " °F"
    day3TempEl.textContent = day3.main.temp + " °F"
    day4TempEl.textContent = day4.main.temp + " °F"
    day5TempEl.textContent = day5.main.temp + " °F"

    day1WindEl.textContent = day1.wind.speed + " MPH"
    day2WindEl.textContent = day2.wind.speed + " MPH"
    day3WindEl.textContent = day3.wind.speed + " MPH"
    day4WindEl.textContent = day4.wind.speed + " MPH"
    day5WindEl.textContent = day5.wind.speed + " MPH"

    day1HumidEl.textContent = day1.main.humidity + "%"
    day2HumidEl.textContent = day2.main.humidity + "%"
    day3HumidEl.textContent = day3.main.humidity + "%"
    day4HumidEl.textContent = day4.main.humidity + "%"
    day5HumidEl.textContent = day5.main.humidity + "%"
}

// This function is taking our search results and logging them under the search
// bar. The purpose of this was to make them log as buttons so that when clicked
// the user would then be shown weather conditions of that recent search.
function recentSearches(location) {
    var getData = JSON.parse(localStorage.getItem("Zip-Code"))

    newZip = getData[0].zip

    var recentSearchEl = document.querySelector(".recent-searches")
    var recentSearchBtn = document.createElement("button")
    recentSearchBtn.setAttribute("style", "cursor: pointer")
    recentSearchBtn.setAttribute("style", "font-weight: bold")

    recentSearchBtn.textContent = getData[0].location
    recentSearchEl.appendChild(recentSearchBtn)
    recentSearchArray = []
    return

}