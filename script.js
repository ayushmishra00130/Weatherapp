const apiKey = "b1bbfb5f594184591d3b4f321a19df68";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "clouds.png";
        }
        if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png";
        }
        if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.png";
        }
        if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png";
        }
        if (data.weather[0].main == "Mist") {
            weatherIcon.src = "mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// trigger search on pressing Enter
searchBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBtn.click(); // Trigger the button click
    }
});
