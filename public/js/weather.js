$(document).ready(function () {

    const weekday = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

    //Current weather data
    const city= document.querySelector('.city-container');
    const temp = document.querySelector('.temp-container');
    const weather = document.querySelector('.weather-container');

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
                },
                success : function(data) {
    
                    if (data.cod === 200) {
                        city.innerHTML = `<div class="city-text">${data.name}</div>`;
                        temp.innerHTML = `<div class="temp-text">${Math.round(data.main.temp) + '°C'}</div>`;
                        weather.innerHTML = `<div class="weather-text">${data.weather[0].main}</div>`;
    
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
                                                                <img class="forecast-icon" src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="weather-icon">
                                                                <div class="forecast-date">${day}</div>
                                                                <div class="forecast-weather">- ${item.weather[0].main}</div>
                                                            </div>
                                                            <div class="forecast-temp">${Math.round(item.main.temp) + '°C'}</div>
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

    navigator.geolocation.getCurrentPosition(OnGetPosition, OnGetPositionError);
});