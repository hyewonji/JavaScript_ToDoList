const weather = document.querySelector(".realTimeWeather");

const API_KEY = 'ed3b96c06f6343ed844ef371d65d6a1b';
const COORDS_LS = 'coords';

function showWeather(weatherObj){
    const tooltipText = weather.getAttributeNode('tooltip-text');
    tooltipText.value = `Weather Detail\n Location: ${weatherObj.name}\n Temperature: ${weatherObj.temperature}°C\n Weather: ${weatherObj.description}`;
    
    const img = document.createElement("img");
    img.className = "weatherImg";
    
    const desc = weatherObj.description;
    if(desc === 'clear sky'){
        img.src = "http://openweathermap.org/img/wn/01d@2x.png";
    } else if(desc === 'few clouds'){
        img.src = "http://openweathermap.org/img/wn/02d@2x.png";
    } else if(desc === 'scattered clouds' || desc === 'broken clouds'){
        img.src = "http://openweathermap.org/img/wn/04d@2x.png";
    } else if(desc === 'shower rain' || desc === 'rain'){
        img.src = "http://openweathermap.org/img/wn/10d@2x.png";
    } else if(desc === 'thunderstorm'){
        img.src = "http://openweathermap.org/img/wn/11d@2x.png";
    } else if(desc === 'snow'){
        img.src = "http://openweathermap.org/img/wn/13d@2x.png";
    } else if(desc === 'mist'){
        img.src = "http://openweathermap.org/img/wn/50d@2x.png";
    } 
    
    weather.appendChild(img);
}

function getWeatherApi(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = (json.main.temp-273).toFixed(1),
            name = json.name,
            description = json.weather[0].description;

        const weatherObj = {
            temperature,
            name,
            description
        }
        showWeather(weatherObj);
    });
}

function handleGeoError(e){
    console.log(e);
}

function saveCoors(lat,lon){
    const coordsObj = {
        latitude:lat,
        longitude:lon
    }
    localStorage.setItem(COORDS_LS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const loadedCoords = localStorage.getItem(COORDS_LS);
    const parseCoords = JSON.parse(loadedCoords);

    const latitude = position.coords.latitude,
        longitude = position.coords.longitude;

    if(loadedCoords === null || (parseCoords.latitude - latitude) > 0.1 || (parseCoords.longitude - longitude) > 0.1){
            saveCoors(latitude,longitude); 
            getWeatherApi(latitude,longitude);  
    } else {
        const lat_LS = parseCoords.latitude,
            lon_LS = parseCoords.longitude;
        getWeatherApi(lat_LS,lon_LS);
    }
}

function getGeoLocation(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function init(){
    getGeoLocation();
}

init();