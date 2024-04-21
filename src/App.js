import './index.css';
import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import InitialScreen from './components/InitialScreen.js';
import SearchBar from './components/SearchBar.js';
import City from './components/City.js';
import MainDescription from './components/MainDescription.js';
import MainIcon from "./components/MainIcon.js";
import ExtraInfo from "./components/ExtraInfo.js";
import FarmAdvice from './components/FarmAdvice.js';
import HourlyForecast from './components/HourlyForecast.js';
import RainHumidity from './components/RainHumidity.js';
import Air from './components/Air.js';
import SevenDay from './components/SevenDay.js';
import SevereAlert from './components/SevereAlert.js';
import Historical from './components/historical.js';
import {
// Importing custom functions and components
  groupDataByDay
} from "./historicaldataFunctions.js";

// Weather component
const Weather = () => {
  // const [API] = useState(process.env.REACT_APP_API_KEY); // API key
  const [loading, setloading] = useState(false); // Loading state
  const [initialSearch, setinitialSearch] = useState(false); // Initial search state
  const [city, setCity] = useState(""); // City state
  const [weatherData, setWeatherData] = useState(null); // Weather data state
  const [data, setData] = useState({ forecast: null, weatherData: null , pollution: null, dayForecast: null,weekRain: null}); // Data state

  // Fetch weather data from API
  const fetchData = async () => {
    if (city !== "") {
      try {
        // Fetch current weather data
        const response = await axios.get(
          `https://pro.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        );

        // Fetch hourly forecasts
        const forecasts = await axios.get(
          `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${process.env.REACT_APP_API_KEY}`
        );

        // Fetch air pollution data
        const pollutions = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${process.env.REACT_APP_API_KEY}`
        );

        // Fetch daily forecasts
        const dayForecasts = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${response.data.coord.lat}&cnt=8&lon=${response.data.coord.lon}&appid=${process.env.REACT_APP_API_KEY}`
        );

        // Calculate historical data range
        let current = new Date();
        current.setDate(current.getDate() - 6); // Subtract 6 instead of 5 to exclude today
        let fiveDaysAgo = Math.floor(current.getTime() / 1000);

        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // Subtract 1 to exclude today
        let yesterdayUnix = Math.floor(yesterday.getTime() / 1000);

        // Fetch historical data
        const historicals = await axios.get(
          `https://history.openweathermap.org/data/2.5/history/city?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&type=day&start=${fiveDaysAgo}&end=${yesterdayUnix}&appid=${process.env.REACT_APP_API_KEY}`
        );

        // Group historical data by day
        const historicalDataByDay = groupDataByDay(historicals.data.list);
        
        // Calculate total rainfall for the week
        const weekRain = calculateTotalRainfall(dayForecasts.data.list);   

        // Update data state with fetched data
        setData(prevState => ({
          ...prevState,
          weatherData: response.data,
          forecast: forecasts.data,
          pollution: pollutions.data,
          dayForecast: dayForecasts.data,
          historical: historicalDataByDay,
          weekRain: weekRain
        }));

        // Update weatherData state
        setWeatherData(response.data);

        // Set initialSearch state to true
        setinitialSearch(true);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    }
  };

  // Calculate total rainfall for the last 7 days
  const calculateTotalRainfall = (forecasts) => {
    let totalRainfall = 0;
    // Assuming forecasts is an array with daily forecast objects
    // and each forecast object has a rain property that might be undefined
    for (let i = 0; i < forecasts.length && i < 7; i++) { // Limit to last 7 days
      const dailyRain = forecasts[i].rain || 0; // Use 0 if rain is undefined
      totalRainfall += dailyRain;
    }
    return totalRainfall;
  };

  // Fetch weather data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle input change for city search
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(); 
  };   

  return (
    <div className={`main-container ${initialSearch ? 'main-container-enter' : ''}`}>
      {loading ? (
        <p>Loading Weather Data...</p>
      ) : (
        <>
          {!initialSearch && (
            <InitialScreen />
          )}
      
          <SearchBar
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            city={city}
            initialSearch={initialSearch}
            fetchData={fetchData}
          />
          {data && weatherData ? (
            <>
              
              {/* City component */}
              <City data={data} />
              {/* MainDescription component */}
              <MainDescription data={data}/>
              {/* MainIcon component */}
              <MainIcon />
              {/* ExtraInfo component */}
              <ExtraInfo data={data}/>
              <br></br>
              {/* FarmAdvice component */}
              <FarmAdvice data={data} />
              <br></br>
              {/* HourlyForecast component */}
              <HourlyForecast data={data} />
              <br></br>
              {/* RainHumidity component */}
              <RainHumidity data={data}/>
              {/* End of First page */}
      
              
              <br></br>    
              {/* Air component (wind and air quality) */}
              <Air data={data} />
              <br></br>
              {/* SevenDay component (7 day forecast) */}
              <SevenDay data={data}  />
              <br></br>
              {/* SevereAlert component */}
              <SevereAlert data={data} />
              <br/>
              {/* Historical Data */}
              <Historical data={data}  />
              {/* End of second page */}
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default Weather;
