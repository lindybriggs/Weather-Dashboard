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


let apiKey = "5de95534471d1fc692031cdf2cecb3b3";

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Chicago&appid=${apiKey}`)
    .then(response => response.json())
    .then(geoData => {

        
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}&exclude=hourly,minutely&units=imperial`)
    })

    .then(response => response.json())
    .then(cityData => {

        console.log(cityData);
        pullCurrentData(cityData);
        futureData(cityData);

    })

})

function pullCurrentData(cityData){

    console.log(cityData);
    console.log(cityData.current.temp);
    console.log(cityData.current.wind_speed);
    console.log(cityData.current.humidity);
    console.log(cityData.current.uvi);

        let currentDate = moment()
        let date = (currentDate.format('MMM Do YY'))
        document.querySelector("#cityCurrent").innerText = cityInput.value + ", " + date;

    document.querySelector("#temp").innerText = "Temp: " + cityData.current.temp + "℉"
    document.querySelector("#wind").innerText = "Wind: " + cityData.current.wind_speed + " MPH"
    document.querySelector("#humidity").innerText = "Humidity: " + cityData.current.humidity + " %"
    document.querySelector("#uv").innerText = "UV Index: " + cityData.current.uvi 
}

function futureData(cityData){
    console.log(cityData.daily);
    let futureArray = cityData.daily;
    console.log(futureArray);

    let cardsArea = document.querySelector("#cityFuture");
    console.log(cardsArea);
   

    for (let i = 0; i < 6; i++) {
        let cardContent = document.createElement("div")

        let temp = document.createElement("h5")
        temp.textContent = futureArray[i].temp.day + "℉"
        cardContent.appendChild(temp)

        let humidity = document.createElement("h5")
        humidity.textContent = "humidity"
        cardContent.appendChild(humidity)
        
        let wind = document.createElement("h5")
        wind.textContent = "wind"
        cardContent.appendChild(wind)

        console.log(futureArray[i].temp.day + "℉");
        console.log(futureArray[i].wind_speed + " MPH");
        console.log(futureArray[i].humidity + " %");
        cardsArea.appendChild(cardContent);

        cardContent.innerHTML = `
        <div class="card col-6 col-md-2">
            <div class="card-body">
                <h5 class="card-title">Temp: ${futureArray[i].temp.day + "℉"}</h5>
                <h5 class="card-title">Wind: ${futureArray[i].wind_speed + " MPH"}</h5>
                <h5 class="card-title">Humidity: ${futureArray[i].humidity + " %"}</h5>
            </div>
        </div>
        `
        
    }
}