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

    if (lang.includes("es") || lang.includes("ES")) {
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
                url : 'https://reno-weather-app.onrender.com/GetCurrentWeatherData',
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

                        current.className = 'current-container'
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
                    }
                }
            });
        }
        catch(e){
            console.log(e);
        }
        
        //Daily forecast data
        try{
            $.ajax({
                url : 'https://reno-weather-app.onrender.com/GetWeatherForecastData',
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
                        
                        forecast.innerHTML += `<div class="daily-forecast-item">`;

                        list.forEach((item, index) => {
                            let date = new Date(item.dt_txt);
                            let time = date.toLocaleTimeString(lang, {hour: '2-digit', minute:'2-digit'});

                            forecast.innerHTML +=  `<div class="daily-forecast-item">
                                                        <div class="daily-forecast-time">${time}</div>
                                                        <div class="daily-forecast-temp">${Math.round(item.main.temp) + '°C'}</div>
                                                        <img class="daily-forecast-icon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png" alt="weather-icon">
                                                        <div class="daily-forecast-weather">- ${item.weather[0].main}</div>
                                                    </div>`;
                        });

                        forecast.innerHTML += `</div>`;
                    }
                }
            });
        }
        catch(e){
            console.log(e);
        }
        
    }

    const OnGetPositionError = (e) => {
        console.log(e);
    }

    city.innerHTML = '<div class="spinner-border" role="status"></div>';
    temp.innerHTML = '<div class="spinner-border" role="status"></div>';
    weather.innerHTML = '<div class="spinner-border" role="status"></div>';
    forecast.innerHTML = '<div class="spinner-border" role="status"></div>';
    current.className = '';

    navigator.geolocation.getCurrentPosition(OnGetPosition, OnGetPositionError);
});