let cityInput = document.getElementById("cityInput");
let searchButton = document.getElementById("searchButton");
let weatherResult = document.getElementById("weatherResult");

function getWeatherDescription(code) {

    if (code === 0) {
        return "Clear sky ☀️";
    }

    else if (code === 1) {
        return "Mainly clear 🌤️";
    }

    else if (code === 2) {
        return "Partly cloudy ⛅";
    }

    else if (code === 3) {
        return "Overcast ☁️";
    }

    else if (code === 45 || code === 48) {
        return "Foggy 🌫️";
    }

    else if (code >= 51 && code <= 57) {
        return "Drizzle 🌦️";
    }

    else if (code >= 61 && code <= 67) {
        return "Rainy 🌧️";
    }

    else if (code >= 71 && code <= 77) {
        return "Snowy ❄️";
    }

    else if (code >= 80 && code <= 82) {
        return "Rain showers 🌧️";
    }

    else if (code === 85 || code === 86) {
        return "Snow showers 🌨️";
    }

    else if (code >= 95 && code <= 99) {
        return "Thunderstorm ⛈️";
    }

    else {
        return "Unknown weather";
    }
}


async function getWeather() {

    let city = cityInput.value.trim();

    if (city === "") {

        weatherResult.textContent =
            "Please enter a city name.";

        return;
    }

    try {

        weatherResult.textContent =
            "Loading...";


        // Get city coordinates from api
        let locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );


        if (!locationResponse.ok) {

            throw new Error("Location request failed.");

        }


        let locationData =
            await locationResponse.json();


        if (!locationData.results) {

            weatherResult.textContent =
                "City not found.";

            return;
        }


        let location = locationData.results[0];


        let latitude = location.latitude;
        let longitude = location.longitude;


        // Get weather from api
        let weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`
        );


        if (!weatherResponse.ok) {

            throw new Error("Weather request failed.");

        }


        let weatherData =
            await weatherResponse.json();


        let currentWeather =
            weatherData.current;

        let description =
            getWeatherDescription(currentWeather.weather_code);
        
        weatherResult.innerHTML = `

            <h2>${location.name}</h2>

            <p>
                Temperature:
                ${currentWeather.temperature_2m}°C
            </p>

            <p>
                Humidity:
                ${currentWeather.relative_humidity_2m}%
            </p>

            <p>
                
                ${description}
            </p>

        `;


    } catch (error) {

        weatherResult.textContent =
            "Something went wrong. Please try again.";

        console.log(error);

    }

}


searchButton.addEventListener(
    "click",
    getWeather
);


cityInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            getWeather();

        }

    }
);