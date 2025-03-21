const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API key

function fetchWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error("Error fetching data:", error));
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error("Error fetching data:", error));
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function displayWeather(data) {
    if (data.cod !== 200) {
        document.getElementById("weatherInfo").innerHTML = `<p>${data.message}</p>`;
        return;
    }

    const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    document.getElementById("weatherInfo").innerHTML = weatherHTML;
}
