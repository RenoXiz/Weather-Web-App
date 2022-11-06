require('dotenv').config();
const fetch = require('node-fetch');

const GetCurrentWeatherData = async (lat, lon) => {
    const api = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const GetWeatherForecastData = async (lat, lon) => {
    const api = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}


module.exports = {
    GetCurrentWeatherData,
    GetWeatherForecastData
}