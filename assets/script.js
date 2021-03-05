console.log("hello world")

//citie array that stores the searches to local storage
var cities = [];

init();

function getWeatherAPI(city){
    var weatherKey = "d74d088f598680d72abe0ce2c850d1b5";
    var apiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&units=imperial&appid=${weatherKey}`;
    let apiQueryFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&appid=${weatherKey}`;

    $.ajax({
        url: apiQuery,
        method: "GET"
    }).then(function(data) {
        console.log(data)
        let cityName = data.name;
        let cityTemperature = data.main.temp;
        let cityHumidity = data.main.humidity;
        let cityWindSpeed = data.wind.speed;
        let cityUvIndex 
        let cityDate = moment().format('L')
        let cityWeatherIcon = data.weather[0].icon;
        let cityIcon = $("<img>").attr("src", `https://openweathermap.org/img/w/${cityWeatherIcon}.png`)
        
        $("#cityTemp").text(cityTemperature);
        $("#cityHumid").text(cityHumidity);
        $("#cityWind").text(cityWindSpeed)
        $("#cityName").text(cityName + " " + cityDate).append(cityIcon)
        console.log(cityTemperature)
        console.log(cityDate)
        
    })

    $.ajax({
        url: apiQueryFiveDays,
        method: "GET"
    }).then(function(data){
        console.log(data)
        
        for (let i = 0; i < 5; i++) {
            let cityTemp = data.list[i].main.temp;
            let cityHumid = data.list[i].main.humidity;
            let cityIcon = data.list[i].weather[0].icon;
            let cardDate = data.list[i].dt_txt
            console.log(cardDate)
            
            
            let cityDiv = $("<div>").attr("class", "card");
            let cityCardBody = $("<div>").attr("class", "card-body");
            let cityDate = $("<p>").text(`Date: ${cardDate}°F`)
            let cityCardTemp = $("<p>").text(`Tempature: ${cityTemp}`)
            let cityCardHumid = $("<p>").text(`Humidity: ${cityHumid}%`)
            let cityCardIcon = $("<img>").attr("src", `https://openweathermap.org/img/w/${cityIcon}.png`)
            cityDiv.append(cityCardBody);
            cityCardBody.append(cityDate, cityCardIcon, cityCardTemp, cityCardHumid);
            $(".fiveDayCards").append(cityDiv)

        }
    })
}
//button on click for form field that takes user input to populate the cards with weather data
$("#find-city").on("click", function(event) {
    event.preventDefault();
    let userCity = $("#city-input").val();
    getWeatherAPI(userCity);
    cities.push(userCity);
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(cities)
    citySearchHistory()
})

$("#clear-cities").on("click",function(){
    cities = [];
    localStorage.setItem("cities", JSON.stringify(cities));
    citySearchHistory();
})

$(".city-history").on("click", function(event){
    event.preventDefault();
    let searchCity = $(this).text();
    getWeatherAPI(searchCity);
    console.log(searchCity)
})

function citySearchHistory() {

    $(".city-history").empty();
    for (let i = 0; i < cities.length; i++) {
        let cityCard = $("<div>").attr("class", "card");
        let cityCardBody = $("<div>").attr("class", "card-body city").text(cities[i]);
        cityCard.append(cityCardBody);
        $(".city-history").prepend(cityCard)
    }
}

function init(){
    let citiesLocalStorage = JSON.parse(localStorage.getItem("cities"));

    if(citiesLocalStorage !== null){
        cities = citiesLocalStorage
    }
    citySearchHistory()
}
