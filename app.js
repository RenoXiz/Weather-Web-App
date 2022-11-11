const express = require('express');
const path = require('path');
const app = express();
const weatherapi = require('./weatherapi.js');
const morgan = require('morgan');
const port = process.env.PORT || 3000;

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//static files
app.use('/public', express.static(path.join(__dirname, 'public')));

//middleware
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes    
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/GetCurrentWeatherData', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed

    weatherapi.GetCurrentWeatherData(req.body.lat, req.body.lon, req.body.lang).then((data) => {
        res.json(data);
    });
});

app.post('/GetWeatherForecastData', (req, res) => {    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed


    weatherapi.GetWeatherForecastData(req.body.lat, req.body.lon, req.body.lang).then((data) => {
        res.json(data);
    });
});

//server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})