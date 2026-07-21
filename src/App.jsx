import { useState } from "react";
import "./App.css";

function App()
{
  const [city, setCity] = useState("");

  const [weatherData, setWeatherData] = useState(null);

  // Generate the weather icon URL if weather data is available
  const iconUrl = weatherData
  ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  : "";
  async function handleSearch() 
  {

    // Get the API key from the .env file
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

   // Create the API URL using the city entered by the user
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Send a request to the OpenWeatherMap API
  const response = await fetch(url);

    // Convert the API response (JSON) into a JavaScript object
  const data = await response.json();
 
  setWeatherData(data);

  
}
  return (

    <div className="app">
      <h1>Weather App</h1>

<div className="search-box">
      <input type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)} 
      />

      <button onClick={handleSearch}>
       Search
      </button>
      </div>

       {weatherData && (
      <div className="weather-card">
        <h2>{weatherData.name}</h2>

        <img src={iconUrl} alt="Weather Icon" />

         <p>Temperature : {weatherData.main.temp} °C</p>

         <p>Humidity  : {weatherData.main.humidity} %</p>

        <p>Wind : {weatherData.wind.speed} m/s</p>

        <p>Feels_like : {weatherData.main.feels_like}</p>

        <p>Main : {weatherData.weather[0].main} </p>

        <p>Description : {weatherData.weather[0].description} </p>

        
      </div>
    )}

    </div>

   
  );
}

export default App;