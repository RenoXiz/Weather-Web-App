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
                                weather.innerHTML = `<div class="weather-text">Despejado</div>`;
                                title.innerHTML = 'Soleado';
                            } else if (data.weather[0].main == "Clouds") {
                                weather.innerHTML = `<div class="weather-text">Nublado</div>`;
                                title.innerHTML = 'Nublado';
                            } else if (data.weather[0].main == "Rain") {
                                weather.innerHTML = `<div class="weather-text">Lluvia</div>`;
                                title.innerHTML = 'Lluvia';
                            } else if (data.weather[0].main == "Snow") {
                                weather.innerHTML = `<div class="weather-text">Nieve</div>`;
                                title.innerHTML = 'Nieve';
                            } else if (data.weather[0].main == "Thunderstorm") {
                                weather.innerHTML = `<div class="weather-text">Tormenta</div>`;
                                title.innerHTML = 'Tormenta';
                            } else if (data.weather[0].main == "Drizzle") {
                                weather.innerHTML = `<div class="weather-text">Llovizna</div>`;
                                title.innerHTML = 'Llovizna';
                            } else if (data.weather[0].main == "Mist") {
                                weather.innerHTML = `<div class="weather-text">Niebla</div>`;
                                title.innerHTML = 'Niebla';
                            } else if (data.weather[0].main == "Smoke") {
                                weather.innerHTML = `<div class="weather-text">Humo</div>`;
                                title.innerHTML = 'Humo';
                            } else if (data.weather[0].main == "Haze") {
                                weather.innerHTML = `<div class="weather-text">Niebla</div>`;
                                title.innerHTML = 'Niebla';
                            } else if (data.weather[0].main == "Dust") {
                                weather.innerHTML = `<div class="weather-text">Polvo</div>`;
                                title.innerHTML = 'Polvo';
                            } else if (data.weather[0].main == "Fog") {
                                weather.innerHTML = `<div class="weather-text">Niebla</div>`;
                                title.innerHTML = 'Niebla';
                            } else if (data.weather[0].main == "Sand") {
                                weather.innerHTML = `<div class="weather-text">Arena</div>`;
                                title.innerHTML = 'Arena';
                            } else if (data.weather[0].main == "Ash") {
                                weather.innerHTML = `<div class="weather-text">Ceniza</div>`;
                                title.innerHTML = 'Ceniza';
                            } else if (data.weather[0].main == "Squall") {
                                weather.innerHTML = `<div class="weather-text">Ráfaga</div>`;
                                title.innerHTML = 'Ráfaga';
                            } else if (data.weather[0].main == "Tornado") {
                                weather.innerHTML = `<div class="weather-text">Tornado</div>`;
                                title.innerHTML = 'Tornado';
                            } else {
                                weather.innerHTML = `<div class="weather-text">Desconocido</div>`;
                                title.innerHTML = 'Desconocido';
                            }
                        } else {
                            weather.innerHTML = `<div class="weather-text">${data.weather[0].main}</div>`;
                            title.innerHTML = data.weather[0].main;
                        }

                        favicon.href = `http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`;
    
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

                                var weatherName = item.weather[0].main;

                                if (lang == 'es') {
                                    if (weatherName == "Clear") {
                                        weatherName = 'Despejado';
                                    } else if (weatherName == "Clouds") {
                                        weatherName = 'Nublado';
                                    } else if (weatherName == "Rain") {
                                        weatherName = 'Lluvia';
                                    } else if (weatherName == "Snow") {
                                        weatherName = 'Nieve';
                                    } else if (weatherName == "Thunderstorm") {
                                        weatherName = 'Tormenta';
                                    } else if (weatherName == "Drizzle") {
                                        weatherName = 'Llovizna';
                                    } else if (weatherName == "Mist") {
                                        weatherName = 'Niebla';
                                    } else if (weatherName == "Smoke") {
                                        weatherName = 'Humo';
                                    } else if (weatherName == "Haze") {
                                        weatherName = 'Niebla';
                                    } else if (weatherName == "Dust") {
                                        weatherName = 'Polvo';
                                    } else if (weatherName == "Fog") {
                                        weatherName = 'Niebla';
                                    } else if (weatherName == "Sand") {
                                        weatherName = 'Arena';
                                    } else if (weatherName == "Ash") {
                                        weatherName = 'Ceniza';
                                    } else if (weatherName == "Squall") {
                                        weatherName = 'Ráfaga';
                                    } else if (weatherName == "Tornado") {
                                        weatherName = 'Tornado';
                                    } else {
                                        weatherName = 'Desconocido';
                                    }
                                }
    
                                forecast.innerHTML +=  `<div class="forecast-item">
                                                            <div class="forecast-info">
                                                                <img class="forecast-icon" src="http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png" alt="weather-icon">
                                                                <div class="forecast-date">${day}</div>
                                                                <div class="forecast-weather">- ${weatherName}</div>
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