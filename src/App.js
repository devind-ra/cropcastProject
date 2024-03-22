import './index.css';
import React, {useEffect, useState} from "react";
import axios from 'axios'; 



import {
  groupDataByDay
} from "./historicaldataFunctions.js";
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



const Weather = () => {
  const[API] = useState("51326c1d8dd29acfc399a1c78b2b21b7")
  const[loading, setloading] = useState(false);
  const[initialSearch, setinitialSearch] = useState(false);
  const[city, setCity] = useState("");
  const[weatherData, setWeatherData] = useState(null);
  const [data, setData] = useState({ forecast: null, weatherData: null , pollution: null, dayForecast: null,weekRain: null});

  const fetchData = async () => {
    if (city !== "") {
      try {
        const response = await axios.get(
          `https://pro.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`
        );

        const forecasts = await axios.get(
          `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${API}`
        );
        const pollutions = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${API}`
        );

        const dayForecasts = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${response.data.coord.lat}&cnt=8&lon=${response.data.coord.lon}&appid=${API}`
        );

        let current = new Date();
        current.setDate(current.getDate() - 6); // Subtract 6 instead of 5 to exclude today
        let fiveDaysAgo = Math.floor(current.getTime() / 1000);

        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // Subtract 1 to exclude today
        let yesterdayUnix = Math.floor(yesterday.getTime() / 1000);



        const historicals = await axios.get(
          `https://history.openweathermap.org/data/2.5/history/city?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&type=day&start=${fiveDaysAgo}&end=${yesterdayUnix}&appid=${API}`
        );
        const historicalDataByDay = groupDataByDay(historicals.data.list);
        
        const weekRain = calculateTotalRainfall(dayForecasts.data.list);   


        setData(prevState => ({
          ...prevState,
          weatherData: response.data,
          forecast: forecasts.data,
          pollution: pollutions.data,
          dayForecast: dayForecasts.data,
          historical: historicalDataByDay,
          weekRain: weekRain
        }));
        setWeatherData(response.data)
        setinitialSearch(true);
      } catch (error) {
        console.error(error);
      } finally{
        setloading(false);
      }
    }
  };

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

  useEffect(()=>{
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleInputChange = (e) =>{
      setCity(e.target.value);// IDK IF WE should update the state here
  };

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
      { data && weatherData ? (
          <>
          {/* First page */}

          <City data={data} />

          <MainDescription data={data}/>
          <MainIcon />
          <ExtraInfo data={data}/>
          <br></br>
          <FarmAdvice data={data} />
          <br></br>
          <HourlyForecast data={data} />
          <br></br>
          <RainHumidity data={data}/>
      {/* End of First page */}
      
      {/* Start of Second page */}
          <br></br>    
          <Air data={data} />

          <br></br>

          <SevenDay data={data}  />

          <br></br>
            <SevereAlert data={data} />
          <br/>
          {/* Historical Data */}
            <Historical data={data}  />
          {/* End of second page */}
          </>
            ): null}
        </>
        )}
    </div>
  );
}
export default Weather;
