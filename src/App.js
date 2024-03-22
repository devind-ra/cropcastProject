import './index.css';
import React, {useEffect, useState} from "react";
import axios from 'axios'; 
import clearicon from './assets/images/01_sunny_color.svg';
import two from './assets/images/02d.svg';
import twon from './assets/images/02n.svg';
import onen from './assets/images/01n.svg';
import three from './assets/images/03d.svg';
import four from './assets/images/04d.svg';
import nine from './assets/images/09d.svg';
import ten from './assets/images/10d.svg';
import eleven from './assets/images/11d.svg';
import thirteen from './assets/images/13d.svg';
import fifty from './assets/images/50d.svg';
import {
  convertEpochTimeToReadable,
  epochToDay,
  kelvinToCelsius,
  mpstomph
} from "./weatherdataConversions.js";
import {
  analyzeWeatherData,
  extremeWeather
} from "./adviceandalerts.js";
import {
  groupDataByDay,
  convertToDate,
  getTemps,
  getRains,
  getWinds,
  calcAvgData
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

function changeBackground(weather) {
  const container = document.querySelector('.main-container'); // Select the main container
  switch (weather) {
      case '13d':
      case '13n':
          //SNOW
          container.style.background = "url('https://gifdb.com/images/high/snow-falling-black-background-x06pri4zj5snb00g.gif') repeat";
          container.style.backgroundSize = "contain"; // Adjust this as needed

          break;
      case '04d':
      case '03d':
      case '03n':
      case '04n':
          //CLOUDS
          container.style.background = "linear-gradient(177deg, rgb(94, 106, 129), rgb(0 25 47)) center center / contain no-repeat";
          container.style.backgroundSize = "contain"; // Adjust this as needed
          break;
      case '02d':
      case '01d':
          //SUNNY
          container.style.background = "linear-gradient(95deg, rgb(54 93 255), rgb(72 169 255)) center center / contain no-repeat";
          container.style.backgroundSize = "contain"; // Adjust this as needed
          break;
          
      case '11d':
      case '11n':
        //THUNDERSTORM
        container.style.background = "#526477 url('https://i.gifer.com/Gler.gif') no-repeat";
        container.style.backgroundSize = "contain"; // Adjust this as needed          
        break;
      case '09d':
      case '10d':
      case '09n':
      case '10n':
          //RAIN
          container.style.background = "black url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/222ab078-7308-4a90-8ec5-216da66a9726/d11mmzc-8c8cf43f-27a6-4bb5-8e41-23999c28b069.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyMmFiMDc4LTczMDgtNGE5MC04ZWM1LTIxNmRhNjZhOTcyNlwvZDExbW16Yy04YzhjZjQzZi0yN2E2LTRiYjUtOGU0MS0yMzk5OWMyOGIwNjkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.uTOe7S9khk1FRKfEOv9S8hB0Zmq8bQMmbTuVQzzWexg') repeat";
          container.style.backgroundSize = "contain"; // Adjust this as needed
          break;
      case '02n':
      case '01n':
          //night
          container.style.background = "black url('https://i.gifer.com/Xkjj.gif') no-repeat";
          container.style.backgroundSize = "contain"; // Adjust this as needed
          break;
      default:
        container.style.background = "background: linear-gradient(136.79deg, #010042, #5e0183)";
  }
}
  //container.style.backgroundSize = 'cover'; 
  //container.style.backgroundPosition = 'center'; 
  //container.style.backgroundRepeat = 'no-repeat'; 

const Weather = () => {
  // (remove comment below when running it with the developer plan when functionality is made)
  // eslint-disable-next-line 
  const[API, setAPI] = useState("51326c1d8dd29acfc399a1c78b2b21b7")
  const[loading, setloading] = useState(false);
  const[initialSearch, setinitialSearch] = useState(false);
  const[city, setCity] = useState("");
  const[weatherData, setWeatherData] = useState(null);
  const [data, setData] = useState({ forecast: null, weatherData: null , pollution: null, dayForecast: null,weekRain: null});
  // console.log("data", data);

  var convert = {
    toCompass: function(degrees)
    {
        return ['North', 'North-NorthEast', 'NorthEast', 'East-NorthEast', 'East', 'East-SouthEast', 'SouthEast', 'South-SouthEast', 'South', 'South-SouthWest', 'SouthWest', 'West-SouthWest', 'West', 'West-NorthWest', 'NorthWest', 'North-NorthWest', 'North'][Math.round(degrees / 11.25 / 2)];
    }
  }

  function capitalise(words){
    let wordsplits = words.split(" ");
    for (let i = 0; i < wordsplits.length; i++){
      wordsplits[i] = wordsplits[i].charAt(0).toUpperCase() + wordsplits[i].slice(1);
    }
    return wordsplits.join(" "); 
  }

  const fetchData = async () => {
    if (city !== "") {
      try {
        const response = await axios.get(
          `https://pro.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`
        );
        console.log("data coord", response.data.coord.lat, response.data.coord.lon);

        const forecasts = await axios.get(
          `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${API}`
        );
        const pollutions = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${API}`
        );

        const dayForecasts = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${response.data.coord.lat}&cnt=8&lon=${response.data.coord.lon}&appid=${API}`
        );
        // Historical Data

        let current = new Date();
        current.setDate(current.getDate() - 6); // Subtract 6 instead of 5 to exclude today
        let fiveDaysAgo = Math.floor(current.getTime() / 1000);

        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // Subtract 1 to exclude today
        let yesterdayUnix = Math.floor(yesterday.getTime() / 1000);

        console.log(fiveDaysAgo);
        console.log(yesterdayUnix);

        const historicals = await axios.get(
          `https://history.openweathermap.org/data/2.5/history/city?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&type=day&start=${fiveDaysAgo}&end=${yesterdayUnix}&appid=${API}`
        );
        const historicalDataByDay = groupDataByDay(historicals.data.list);
        console.log(historicalDataByDay);
        
        const weekRain = calculateTotalRainfall(dayForecasts.data.list);   
        console.log("weekRain", weekRain);     
        // Update state
        setWeatherData(response.data);
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
        console.log(response.data);
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

  const iconMapping = {
    '01d': clearicon,
    '02d': two,
    '03d': three,
    '04d': four,
    '09d': nine,
    '10d': ten,
    '11d': eleven,
    '13d': thirteen,
    '50d': fifty,
    '01n': onen,
    '02n': twon,
    '03n': three,
    '04n': four,
    '09n': nine,
    '10n': ten,
    '11n': eleven,
    '13n': thirteen,
    '50n': fifty,

  };
  
  const getWeatherIcon = (condition) => {
    return iconMapping[condition] || `https://openweathermap.org/img/wn/${condition}@2x.png`; // Use a default icon as a fallback
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
      {console.log("data after form", data)}
      { data && weatherData ? (
          <>
          {/* First page */}

          <City data={data} />

          <MainDescription data={data} changeBackground={changeBackground}/>
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
