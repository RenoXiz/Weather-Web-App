$(document).ready(function () {

    var lang = window.navigator.language || navigator.browserLanguage;

    var weekday = new Array();
    var weatherCondition = new Array();


    if (lang == "es-ES" || lang == "es" || lang == "es-419" || lang == "es-AR" || lang == "es-BO" || lang == "es-CL" || lang == "es-CO" || lang == "es-CR" || lang == "es-DO" || lang == "es-EC" || lang == "es-SV" || lang == "es-GT" || lang == "es-HN" || lang == "es-MX" || lang == "es-NI" || lang == "es-PA" || lang == "es-PY" || lang == "es-PE" || lang == "es-PR" || lang == "es-UY" || lang == "es-VE") {
        weekday = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    } else {
        weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    }

    //favicon
    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');

    //title
    const title = document.querySelector("title");

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

                        if (lang == "es-ES" || lang == "es" || lang == "es-419" || lang == "es-AR" || lang == "es-BO" || lang == "es-CL" || lang == "es-CO" || lang == "es-CR" || lang == "es-DO" || lang == "es-EC" || lang == "es-SV" || lang == "es-GT" || lang == "es-HN" || lang == "es-MX" || lang == "es-NI" || lang == "es-PA" || lang == "es-PY" || lang == "es-PE" || lang == "es-PR" || lang == "es-UY" || lang == "es-VE") {
                            if (data.weather[0].main == "Clear") {
                                weather.innerHTML = `<div class="weather-text">Soleado</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Soleado';
                            } else if (data.weather[0].main == "Clouds") {
                                weather.innerHTML = `<div class="weather-text">Nublado</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Nublado';
                            } else if (data.weather[0].main == "Rain") {
                                weather.innerHTML = `<div class="weather-text">Lluvia</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Lluvia';
                            } else if (data.weather[0].main == "Snow") {
                                weather.innerHTML = `<div class="weather-text">Nieve</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Nieve';
                            } else if (data.weather[0].main == "Thunderstorm") {
                                weather.innerHTML = `<div class="weather-text">Tormenta</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Tormenta';
                            } else if (data.weather[0].main == "Drizzle") {
                                weather.innerHTML = `<div class="weather-text">Llovizna</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Llovizna';
                            } else if (data.weather[0].main == "Mist") {
                                weather.innerHTML = `<div class="weather-text">Niebla</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Niebla';
                            } else if (data.weather[0].main == "Smoke") {
                                weather.innerHTML = `<div class="weather-text">Humo</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Humo';
                            } else if (data.weather[0].main == "Haze") {
                                weather.innerHTML = `<div class="weather-text">Niebla</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Niebla';
                            } else if (data.weather[0].main == "Dust") {
                                weather.innerHTML = `<div class="weather-text">Polvo</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Polvo';
                            } else if (data.weather[0].main == "Fog") {
                                weather.innerHTML = `<div class="weather-text">Niebla</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Niebla';
                            } else if (data.weather[0].main == "Sand") {
                                weather.innerHTML = `<div class="weather-text">Arena</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Arena';
                            } else if (data.weather[0].main == "Ash") {
                                weather.innerHTML = `<div class="weather-text">Ceniza</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Ceniza';
                            } else if (data.weather[0].main == "Squall") {
                                weather.innerHTML = `<div class="weather-text">Ráfaga</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Ráfaga';
                            } else if (data.weather[0].main == "Tornado") {
                                weather.innerHTML = `<div class="weather-text">Tornado</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Tornado';
                            } else {
                                weather.innerHTML = `<div class="weather-text">Desconocido</div>`;
                                favicon.href = 'https://i.imgur.com/4ZQ9Z4u.png';
                                title.innerHTML = 'Desconocido';
                            }
                        } else {
                            weather.innerHTML = `<div class="weather-text">${data.weather[0].main}</div>`;
                            favicon.href = `http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`;
                            title.innerHTML = data.weather[0].main;
                        }
    
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
                                                                <img class="forecast-icon" src="http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png" alt="weather-icon">
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