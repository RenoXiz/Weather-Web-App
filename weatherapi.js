require('dotenv').config();
const fetch = require('node-fetch');

const GetCurrentWeatherData = async (lat, lon, lang) => {
    const api = process.env.API_KEY;

    if(lang == "es-ES" || lang == "es" || lang == "es-419" || lang == "es-AR" || lang == "es-BO" || lang == "es-CL" || lang == "es-CO" || lang == "es-CR" || lang == "es-DO" || lang == "es-EC" || lang == "es-SV" || lang == "es-GT" || lang == "es-HN" || lang == "es-MX" || lang == "es-NI" || lang == "es-PA" || lang == "es-PY" || lang == "es-PE" || lang == "es-PR" || lang == "es-UY" || lang == "es-VE"){
        lang = "es";
    }
    else{
        lang = "en";
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${api}`;

    const response = await fetch(url);
    const data = await response.json();

    if(lang == "es-ES" || lang == "es" || lang == "es-419" || lang == "es-AR" || lang == "es-BO" || lang == "es-CL" || lang == "es-CO" || lang == "es-CR" || lang == "es-DO" || lang == "es-EC" || lang == "es-SV" || lang == "es-GT" || lang == "es-HN" || lang == "es-MX" || lang == "es-NI" || lang == "es-PA" || lang == "es-PY" || lang == "es-PE" || lang == "es-PR" || lang == "es-UY" || lang == "es-VE"){
        if (data.weather[0].main == "Clear") {
            data.weather[0].main = 'Soleado';
        } else if (data.weather[0].main == "Clouds") {
            data.weather[0].main = 'Nublado';
        } else if (data.weather[0].main == "Rain") {
            data.weather[0].main = 'Lluvia';
        } else if (data.weather[0].main == "Snow") {
            data.weather[0].main = 'Nieve';
        } else if (data.weather[0].main == "Thunderstorm") {
            data.weather[0].main = 'Tormenta';
        } else if (data.weather[0].main == "Drizzle") {
            data.weather[0].main = 'Llovizna';
        } else if (data.weather[0].main == "Mist") {
            data.weather[0].main = 'Niebla';
        } else if (data.weather[0].main == "Smoke") {
            data.weather[0].main = 'Humo';
        } else if (data.weather[0].main == "Haze") {
            data.weather[0].main = 'Niebla';
        } else if (data.weather[0].main == "Dust") {
            data.weather[0].main = 'Polvo';
        } else if (data.weather[0].main == "Fog") {
            data.weather[0].main = 'Niebla';
        } else if (data.weather[0].main == "Sand") {
            data.weather[0].main = 'Arena';
        } else if (data.weather[0].main == "Ash") {
            data.weather[0].main = 'Ceniza';
        } else if (data.weather[0].main == "Squall") {
            data.weather[0].main = 'Ráfaga';
        } else if (data.weather[0].main == "Tornado") {
            data.weather[0].main = 'Tornado';
        } else {
            data.weather[0].main = 'Desconocido';
        }
    }

    return data;
}

const GetWeatherForecastData = async (lat, lon, lang) => {
    const api = process.env.API_KEY;

    if(lang == "es-ES" || lang == "es" || lang == "es-419" || lang == "es-AR" || lang == "es-BO" || lang == "es-CL" || lang == "es-CO" || lang == "es-CR" || lang == "es-DO" || lang == "es-EC" || lang == "es-SV" || lang == "es-GT" || lang == "es-HN" || lang == "es-MX" || lang == "es-NI" || lang == "es-PA" || lang == "es-PY" || lang == "es-PE" || lang == "es-PR" || lang == "es-UY" || lang == "es-VE"){
        lang = "es";
    }
    else{
        lang = "en";
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${api}`;

    const response = await fetch(url);
    const data = await response.json();

    if(lang == "es-ES" || lang == "es" || lang == "es-419" || lang == "es-AR" || lang == "es-BO" || lang == "es-CL" || lang == "es-CO" || lang == "es-CR" || lang == "es-DO" || lang == "es-EC" || lang == "es-SV" || lang == "es-GT" || lang == "es-HN" || lang == "es-MX" || lang == "es-NI" || lang == "es-PA" || lang == "es-PY" || lang == "es-PE" || lang == "es-PR" || lang == "es-UY" || lang == "es-VE"){
        data.list.forEach((element) => {
            if (element.weather[0].main == "Clear") {
                element.weather[0].main = 'Soleado';
            } else if (element.weather[0].main == "Clouds") {
                element.weather[0].main = 'Nublado';
            } else if (element.weather[0].main == "Rain") {
                element.weather[0].main = 'Lluvia';
            } else if (element.weather[0].main == "Snow") {
                element.weather[0].main = 'Nieve';
            } else if (element.weather[0].main == "Thunderstorm") {
                element.weather[0].main = 'Tormenta';
            } else if (element.weather[0].main == "Drizzle") {
                element.weather[0].main = 'Llovizna';
            } else if (element.weather[0].main == "Mist") {
                element.weather[0].main = 'Niebla';
            } else if (element.weather[0].main == "Smoke") {
                element.weather[0].main = 'Humo';
            } else if (element.weather[0].main == "Haze") {
                element.weather[0].main = 'Niebla';
            } else if (element.weather[0].main == "Dust") {
                element.weather[0].main = 'Polvo';
            } else if (element.weather[0].main == "Fog") {
                element.weather[0].main = 'Niebla';
            } else if (element.weather[0].main == "Sand") {
                element.weather[0].main = 'Arena';
            } else if (element.weather[0].main == "Ash") {
                element.weather[0].main = 'Ceniza';
            } else if (element.weather[0].main == "Squall") {
                element.weather[0].main = 'Ráfaga';
            } else if (element.weather[0].main == "Tornado") {
                element.weather[0].main = 'Tornado';
            } else {
                element.weather[0].main = 'Desconocido';
            }
        });
    }

    return data;
}


module.exports = {
    GetCurrentWeatherData,
    GetWeatherForecastData
}