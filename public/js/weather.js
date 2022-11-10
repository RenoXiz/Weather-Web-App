$(document).ready(function () {

    var lang = window.navigator.language || navigator.browserLanguage;

    var weekday = new Array();

    var feel_like = "";
    var humidity = "";
    var chance_of_rain = "";
    var pressure = "";
    var wind_speed = "";
    var wind_direction = "";

    const DegToCompass = (num) => {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    if (String.prototype.includes(lang, "es") == 0) {
        weekday = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        
        feel_like = "Sensación térmica";
        humidity = "Humedad";
        chance_of_rain = "Probabilidad de lluvia";
        pressure = "Presión";
        wind_speed = "Velocidad del viento";
        wind_direction = "Dirección del viento";
    } else {
        weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        feel_like = "Feels like";
        humidity = "Humidity";
        chance_of_rain = "Chance of rain";
        pressure = "Pressure";
        wind_speed = "Wind speed";
        wind_direction = "Wind direction";
    }

    //favicon
    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');

    //title
    const title = document.querySelector("title");

    //Current weather data
    const city= document.querySelector('.city-container');
    const temp = document.querySelector('.temp-container');
    const weather = document.querySelector('.weather-container');
    const current = document.querySelector('.current-container');

    //Daily forecast data
    const forecast = document.querySelector('.forecast-container');

    const OnGetPosition = (position) => {

        //Current weather data
        try{
            $.ajax({
                url : 'https://reno-weather-app.herokuapp.com/GetCurrentWeatherData',
                type : 'POST',
                data : {
                    lat : position.coords.latitude,
                    lon : position.coords.longitude,
                    lang : lang
                },
                success : function(data) {
    
                    if (data.cod === 200) {
                        city.innerHTML = `<div class="city-text">${data.name}</div>`;
                        temp.innerHTML = `<div class="temp-text">${Math.round(data.main.temp) + '°C'}</div>`;
                        weather.innerHTML = `<div class="weather-text">${data.weather[0].main}</div>`;

                        current.innerHTML = `
                            <div class="temp-feel-like">
                                <div class="temp-feel-like-text">${feel_like}</div>
                                <div class="temp-feel-like-value">${Math.round(data.main.feels_like) + '°C'}</div>
                            </div>
                            <div class="humidity">
                                <div class="humidity-text">${humidity}</div>
                                <div class="humidity-value">${data.main.humidity + '%'}</div>
                            </div>
                            <div class="chance-of-rain">
                                <div class="chance-of-rain-text">${chance_of_rain}</div>
                                <div class="chance-of-rain-value">${data.clouds.all + '%'}</div>
                            </div>
                            <div class="pressure">
                                <div class="pressure-text">${pressure}</div>
                                <div class="pressure-value">${data.main.pressure + ' hPa'}</div>
                            </div>
                            <div class="wind-speed">
                                <div class="wind-speed-text">${wind_speed}</div>
                                <div class="wind-speed-value">${data.wind.speed + ' m/s'}</div>
                            </div>
                            <div class="wind-direction">
                                <div class="wind-direction-text">${wind_direction}</div>
                                <div class="wind-direction-value">${DegToCompass(data.wind.deg)}</div>
                            </div>
                            `;
                        
                        favicon.href = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                        title.innerHTML = 'Weather - ' + data.weather[0].main;

                        localStorage.setItem('city', city.innerHTML);
                        localStorage.setItem('temp', temp.innerHTML);
                        localStorage.setItem('weather', weather.innerHTML);
                    }
                    else {
                        city.innerHTML = localStorage.getItem('city');
                        temp.innerHTML = localStorage.getItem('temp');
                        weather.innerHTML = localStorage.getItem('weather');
                    }
                }
            });
        }
        catch(e){
            console.log(e);

            city.innerHTML = localStorage.getItem('city');
            temp.innerHTML = localStorage.getItem('temp');
            weather.innerHTML = localStorage.getItem('weather');
        }
        
        //Daily forecast data
        try{
            $.ajax({
                url : 'https://reno-weather-app.herokuapp.com/GetWeatherForecastData',
                type : 'POST',
                data : {
                    lat : position.coords.latitude,
                    lon : position.coords.longitude,
                    lang : lang
                },
                success : function(data) {
                    if (data.cod === '200') {
                        list = data.list;
    
                        forecast.innerHTML = '';
                        list.forEach((item, index) => {
                            if (index % 8 === 0) {
                                let date = new Date(item.dt_txt);
                                let day = weekday[date.getDay()];

                                forecast.innerHTML +=  `<div class="forecast-item">
                                                            <div class="forecast-info">
                                                                <img class="forecast-icon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png" alt="weather-icon">
                                                                <div class="forecast-date">${day}</div>
                                                                <div class="forecast-weather">- ${item.weather[0].main}</div>
                                                            </div>
                                                            <div class="forecast-temp">${Math.round(item.main.temp_max) + '°C'}</div>
                                                        </div>`;
                            }
                        });
    
                        localStorage.setItem('forecast', forecast.innerHTML);
                    }
                    else {
                        forecast.innerHTML = localStorage.getItem('forecast');
                    }
                }
            });
        }
        catch(e){
            console.log(e);
            
            forecast.innerHTML = localStorage.getItem('forecast');
        }
        
    }

    const OnGetPositionError = (e) => {
        city.innerHTML = localStorage.getItem('city');
        temp.innerHTML = localStorage.getItem('temp');
        weather.innerHTML = localStorage.getItem('weather');
        forecast.innerHTML = localStorage.getItem('forecast');
    }

    city.innerHTML = '<div class="spinner-border" role="status"></div>';
    temp.innerHTML = '<div class="spinner-border" role="status"></div>';
    weather.innerHTML = '<div class="spinner-border" role="status"></div>';
    forecast.innerHTML = '<div class="spinner-border" role="status"></div>';
    current.innerHTML = '<div class="spinner-border" role="status"></div>';

    navigator.geolocation.getCurrentPosition(OnGetPosition, OnGetPositionError);
});