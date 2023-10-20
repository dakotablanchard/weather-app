var date = document.querySelector("#date")
var apiKey = "b3b885146dce3d4c2a9d8e921432d8fb"
var today = dayjs()

// Set current date on screen using dayjs
date.textContent = today.format("MMMM D, YYYY")

function searchCity() {
    var zipCode = document.querySelector("#zip-search").value
    var getCoordinates = "http://api.openweathermap.org/geo/1.0/zip?zip=" + zipCode + ",US&appid=" + apiKey

    fetch(getCoordinates,)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data.lat, data.lon)
        });

    var getCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

}