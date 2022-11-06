$(document).ready(function () {
    
    const city = document.querySelector('#city');
    const temp = document.querySelector('#temp');
    const weather = document.querySelector('#weather');

    const OnGetPosition = (position) => {

        $.ajax({
            url : 'http://localhost',
            type : 'POST',
            data : {
                lat : position.coords.latitude,
                lon : position.coords.longitude,
            },
            success : function(data) {

                if (data.cod === 200) {
                    city.textContent = data.name;
                    temp.textContent = Math.round(data.main.temp);
                    weather.textContent = data.weather[0].main;

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
    }

    const OnGetPositionError = (error) => {
        city.innerHTML = localStorage.getItem('city');
        temp.innerHTML = localStorage.getItem('temp');
        weather.innerHTML = localStorage.getItem('weather');
    }

    city.innerHTML = 'Cargando...';
    temp.innerHTML = 'Cargando...';
    weather.innerHTML = 'Cargando...';

    navigator.geolocation.getCurrentPosition(OnGetPosition, OnGetPositionError);
});