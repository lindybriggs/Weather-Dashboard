// GIVEN a weather dashboard with form inputs

let searchButton = document.querySelector("#search")
let cityInput = document.querySelector("#city")
let historyArea = document.querySelector("#storeHistory")
let searchCity = ""

let cityHistory = [];
if (localStorage.searchedCity !== undefined) {
    cityHistory = JSON.parse(localStorage.searchedCity)
}
saveHistory();

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    mainFunction()
    saveHistory(cityHistory);
})

function mainFunction() {
    searchCity = cityInput.value

    console.log(cityInput.value)

    cityHistory.push(cityInput.value)

    localStorage.setItem("searchedCity", JSON.stringify(cityHistory))
    console.log(localStorage);
    console.log(localStorage.searchedCity);
    console.log(cityHistory);

    fetchCityData(searchCity)

}

function fetchCityData(searchCity) {
    let apiKey = "5de95534471d1fc692031cdf2cecb3b3";

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&appid=${apiKey}`)
        .then(response => response.json())
        .then(geoData => {


            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}&exclude=hourly,minutely&units=imperial`)
        })

        .then(response => response.json())
        .then(cityData => {

            // console.log(cityData);

            pullCurrentData(cityData, searchCity);
            futureData(cityData);

        })
}

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
function pullCurrentData(cityData, searchCity) {

    console.log(cityData);
    // console.log(cityData.current.weather[0].icon)
    // console.log(cityData.current.temp);
    // console.log(cityData.current.wind_speed);
    // console.log(cityData.current.humidity);
    // console.log(cityData.current.uvi);

    let currentDate = moment()
    let date = (currentDate.format('MMM Do YY'))
    document.querySelector("#cityCurrent").innerText = searchCity + ", " + date;

    let iconUrl = `<img src= "http://openweathermap.org/img/wn/${cityData.current.weather[0].icon}@2x.png"/>`
    // console.log(iconUrl)

    document.querySelector("#currentIcon").innerHTML = iconUrl
    document.querySelector("#temp").innerText = "Temp: " + cityData.current.temp + "℉"
    document.querySelector("#wind").innerText = "Wind: " + cityData.current.wind_speed + " MPH"
    document.querySelector("#humidity").innerText = "Humidity: " + cityData.current.humidity + " %"
    document.querySelector("#uv").innerText = "UV Index: "
    let index = `<span id="uvColor" class="px-2 py-2 rounded">${cityData.current.uvi}</span>`
    $("#uv").append(index)

    // WHEN I view the UV index
    // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    if (cityData.current.uvi >= 0 && cityData.current.uvi <= 2) {
        $("#uvColor").css("background-color", "green").css("color", "white");
    } else if (cityData.current.uvi >= 2 && cityData.current.uvi <= 5) {
        $("#uvColor").css("background-color", "yellow").css("color", "black");
    } else {
        $("#uvColor").css("background-color", "red").css("color", "white");
    }
}

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
function futureData(cityData) {

    let futureHeader = document.querySelector("#futureHeader");
    futureHeader.innerHTML = "5-Day Forecast";

    // console.log(cityData.daily);
    let futureArray8 = cityData.daily;
    let futureArray = futureArray8.slice(1);
    // console.log(futureArray.slice(1));
    // console.log(futureArray)

    let cardsArea = document.querySelector("#cityFuture");
    // console.log(cardsArea);
    cardsArea.innerHTML = "";


    for (let i = 0; i < 6; i++) {
        let cardContent = document.createElement("div")


        let iconUrl = `<img src= "http://openweathermap.org/img/wn/${futureArray[i].weather[0].icon}@2x.png"/>`
        // console.log(iconUrl)


        let temp = document.createElement("h5")
        temp.textContent = futureArray[i].temp.day + "℉"
        cardContent.appendChild(temp)
        cardContent.classList.add("card");

        let humidity = document.createElement("h5")
        humidity.textContent = "humidity"
        cardContent.appendChild(humidity)

        let wind = document.createElement("h5")
        wind.textContent = "wind"
        cardContent.appendChild(wind)

        // console.log(futureArray[i].dt)
        // console.log(futureArray[i].temp.day + "℉");
        // console.log(futureArray[i].wind_speed + " MPH");
        // console.log(futureArray[i].humidity + " %");

        cardsArea.appendChild(cardContent);

        cardContent.innerHTML = `
        <div >
        <div class="card custom-card">
            <h3 class="card-header futureDate" style="font-size: 0.9rem">${moment.unix(futureArray[i].dt).format("l")}</h3>
            <p>${iconUrl}</p>
            <h5 class="tempFuture" style="font-size: 0.9rem">Temp: ${futureArray[i].temp.day + "℉"}</h5>
            <h5 class="windFuture" style="font-size: 0.9rem">Wind: ${futureArray[i].wind_speed + " MPH"}</h5>
            <h5 class="humidityFuture" style="font-size: 0.9rem">Humidity: ${futureArray[i].humidity + " %"}</h5>
        </div>
    </div>
        `
    }
}

// Build search history using local storage from above
function saveHistory() {
    historyArea.innerHTML = "";

    for (let i = 0; i < cityHistory.length; i++) {

        let pastButton = document.createElement("button")
        pastButton.textContent = cityHistory[i];
        pastButton.classList.add("btn-light");
        pastButton.classList.add("col-md-12");
        pastButton.classList.add("display")
        historyArea.prepend(pastButton);

        console.log(pastButton.textContent)

    }
}

// console.log(cityHistory)

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
$(document).on("click", ".display", function () {
    let buttonCity = $(this).text();
    console.log(buttonCity);

    fetchCityData(buttonCity)

}
)