$(document).ready(function () {
    
    //Current weather data
    const city= document.querySelector('.city-container');
    const temp = document.querySelector('.temp-container');
    const weather = document.querySelector('.weather-container');

    //Daily forecast data
    const forecast = document.querySelector('.forecast-container');

    const OnGetPosition = (position) => {

        //Current weather data
        $.ajax({
            url : 'http://localhost/GetCurrentWeatherData',
            type : 'POST',
            data : {
                lat : position.coords.latitude,
                lon : position.coords.longitude,
            },
            success : function(data) {

                if (data.cod === 200) {
                    city.innerHTML = `<div class="city-text">${data.name}</div>`;
                    temp.innerHTML = `<div class="temp-text">${Math.round(data.main.temp) + '°C'}</div>`;
                    weather.innerHTML = `<div class="weather-text">${data.weather[0].main}</div>`;

                    localStorage.setItem('city', city.innerHTML);
                    localStorage.setItem('temp', temp.innerHTML);
                    localStorage.setItem('weather', weather.innerHTML);
                    localStorage.setItem('time', new Date().getTime());
                }
                else {
                    city.innerHTML = localStorage.getItem('city');
                    temp.innerHTML = localStorage.getItem('temp');
                    weather.innerHTML = localStorage.getItem('weather');
                }
            }
        });

        //Daily forecast data
        $.ajax({
            url : 'http://localhost/GetWeatherForecastData',
            type : 'POST',
            data : {
                lat : position.coords.latitude,
                lon : position.coords.longitude,
            },
            success : function(data) {
                console.log(data);
            }
        });
    }

    const OnGetPositionError = (error) => {
        city.innerHTML = localStorage.getItem('city');
        temp.innerHTML = localStorage.getItem('temp');
        weather.innerHTML = localStorage.getItem('weather');
    }

    city.innerHTML = '<div class="spinner-border" role="status"></div>';
    temp.innerHTML = '<div class="spinner-border" role="status"></div>';
    weather.innerHTML = '<div class="spinner-border" role="status"></div>';
    forecast.innerHTML = '<div class="spinner-border" role="status"></div>';

    navigator.geolocation.getCurrentPosition(OnGetPosition, OnGetPositionError);
});