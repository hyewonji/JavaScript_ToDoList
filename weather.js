const API_KEY = 'ed3b96c06f6343ed844ef371d65d6a1b';

function getWeatherApi(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
    })
}

function getGeoLocation(lat,lon){
    navigator.geolocation.getCurrentPosition(
        (position)=>{
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        }
    )
}

async function getWeather(){
    let lat, lon;
    await getGeoLocation(lat,lon);
    console.log(lat,lon);
    await getWeatherApi(lat,lon);
    console.log(2);
}

function init(){
    getWeather();
}

init();