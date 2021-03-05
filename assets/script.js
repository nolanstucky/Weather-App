console.log("hello world")

//citie array that stores the searches to local storage
var cities = [];


var city = "bothell"

getWeatherAPI(city);

function getWeatherAPI(city){
    var weatherKey = "d74d088f598680d72abe0ce2c850d1b5";
    var apiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&units=imperial&appid=${weatherKey}`;

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
}