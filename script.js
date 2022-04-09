// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

let searchButton = document.querySelector("#search")
let cityInput =  document.querySelector("#city")

searchButton.addEventListener("click", function(){
    console.log(cityInput.value)
})

let apiKey = "5de95534471d1fc692031cdf2cecb3b3";

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Chicago&appid=${apiKey}`)
    .then(response => response.json())
    .then(geoData => {

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}`)
    })

    .then(response => response.json())
    .then(cityData => {

        console.log(cityData);
    })

