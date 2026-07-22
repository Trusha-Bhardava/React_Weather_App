import { useState } from "react";
import "./App.css";
import clear from "./image/clear.jpg";
import clouds from "./image/clouds.jpg";
import rain from "./image/rainy.jpg";
import snow from "./image/snow.jpg";
import mist from "./image/mist.jpg";
import thunderstorm from "./image/thunderstorm.jpg";

function App()
{
  const [city, setCity] = useState("");

  const [weatherData, setWeatherData] = useState(null);

  const [loading, setLoading] = useState(false);  

  // Generate the weather icon URL if weather data is available
  const iconUrl = weatherData
  ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  : "";

  let backgroundImage = clear;

if (weatherData) {
  switch (weatherData.weather[0].main) {
    case "Clouds":
      backgroundImage = clouds;
      break;

    case "Rain":
      backgroundImage = rain;
      break;

    case "Snow":
      backgroundImage = snow;
      break;

    case "Mist":
      backgroundImage = mist;
      break;

    case "Thunderstorm":
      backgroundImage = thunderstorm;
      break;

    default:
      backgroundImage = clear;
  }
}


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
  
  setLoading(false);  
  
}
  return (

    <div className="app" style={{
    backgroundImage: `url(${backgroundImage})`,
  }}>
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
        <p className="country">
         {weatherData.sys.country}
         </p>

        <img src={iconUrl} alt="Weather Icon" />

        <h1 className="temp">
        {Math.round(weatherData.main.temp)}°C
        </h1>

       <div className="weather-details">

  <div className="detail-card">
    <h3>💧 Humidity</h3>
    <p>{weatherData.main.humidity}%</p>
  </div>

  <div className="detail-card">
    <h3>🌬 Wind</h3>
    <p>{weatherData.wind.speed} m/s</p>
  </div>

  <div className="detail-card">
    <h3>🌡 Feels Like</h3>
    <p>{Math.round(weatherData.main.feels_like)}°C</p>
  </div>

  <div className="detail-card">
    <h3>☁️ Weather</h3>
    <p>{weatherData.weather[0].main}</p>
  </div>

</div>

        
      </div>
    )}

    </div>

   
  );
}

export default App;