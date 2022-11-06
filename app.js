const express = require('express');
const path = require('path');
const app = express();
const weatherapi = require('./weatherapi.js');
const port = 80;

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/',require('body-parser').urlencoded({ extended: false }), (req, res) => {
    weatherapi.GetDataWeather(req.body.lat, req.body.lon).then((data) => {
        res.json(data);
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`API key: ${process.env.API_KEY}`);
})