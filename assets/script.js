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
    }).then(function(response) {
        console.log(response)
    })
}