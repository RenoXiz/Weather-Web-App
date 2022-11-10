require('dotenv').config();
const fetch = require('node-fetch');

const GetCurrentWeatherData = async (lat, lon, lang) => {
    const api = process.env.API_KEY;

    if(String.prototype.includes(lang, "es") == 0){
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
            data.weather[0].main = 'Despejado';
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
        data.list.forEach((item) => {
            if (item.weather[0].main == "Clear") {
                item.weather[0].main = 'Despejado';
            } else if (item.weather[0].main == "Clouds") {
                item.weather[0].main = 'Nublado';
            } else if (item.weather[0].main == "Rain") {
                item.weather[0].main = 'Lluvia';
            } else if (item.weather[0].main == "Snow") {
                item.weather[0].main = 'Nieve';
            } else if (item.weather[0].main == "Thunderstorm") {
                item.weather[0].main = 'Tormenta';
            } else if (item.weather[0].main == "Drizzle") {
                item.weather[0].main = 'Llovizna';
            } else if (item.weather[0].main == "Mist") {
                item.weather[0].main = 'Niebla';
            } else if (item.weather[0].main == "Smoke") {
                item.weather[0].main = 'Humo';
            } else if (item.weather[0].main == "Haze") {
                item.weather[0].main = 'Niebla';
            } else if (item.weather[0].main == "Dust") {
                item.weather[0].main = 'Polvo';
            } else if (item.weather[0].main == "Fog") {
                item.weather[0].main = 'Niebla';
            } else if (item.weather[0].main == "Sand") {
                item.weather[0].main = 'Arena';
            } else if (item.weather[0].main == "Ash") {
                item.weather[0].main = 'Ceniza';
            } else if (item.weather[0].main == "Squall") {
                item.weather[0].main = 'Ráfaga';
            } else if (item.weather[0].main == "Tornado") {
                item.weather[0].main = 'Tornado';
            } else {
                item.weather[0].main = 'Desconocido';
            }
        });
    }

    return data;
}


module.exports = {
    GetCurrentWeatherData,
    GetWeatherForecastData
}