let cityInput = document.getElementById("cityInput");
let searchButton = document.getElementById("searchButton");
let weatherResult = document.getElementById("weatherResult");


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


        // Get city coordinates
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


        // Get weather
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
                Weather Code:
                ${currentWeather.weather_code}
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