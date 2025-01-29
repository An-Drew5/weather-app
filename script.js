const apiKey = '7cd3b22416374373657ad74e3e887592';

async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weatherInfo');
    const errorElement = document.getElementById('error');

    if (!cityInput) return;


    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        
        // Update DOM elements
        document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
        
        // Update weather icon
        const iconCode = data.weather[0].icon;
        document.getElementById('weatherIcon').src = 
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Show weather info
        errorElement.style.display = 'none';
        weatherInfo.classList.add('show');
    } catch (error) {
        weatherInfo.classList.remove('show');
        errorElement.style.display = 'block';
    }
}

// Allow Enter key to trigger search
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});