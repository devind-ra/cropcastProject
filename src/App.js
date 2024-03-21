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
import InitialScreen from './InitialScreen.js';
import SearchBar from './SearchBar.js';

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
          
      case '04n':
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
      />
      {console.log("weatherData after form", weatherData)}
      {console.log("data after form", data)}
      { data && weatherData ? (
          <>
          {/* First page */}

          <div className='flex-row-city'>
            {console.log("name", data.weatherData.name)}
            {console.log(data.forecast.city.name)}
            <span className='city'>{data.weatherData.name}</span>
          </div>

          <div className='flex-row-maindescription'>
            <span className='mainweather-description'>{capitalise(data.weatherData.weather[0].description)}</span>
            <div className='mainweather-icon' style={{
              backgroundImage: `url(${getWeatherIcon(weatherData.weather[0].icon)})`}}/> {/*Main image is this*/}
            <span className='mainweather-temp'>{Math.round(data.weatherData.main.temp)}°</span>
            {changeBackground(weatherData.weather[0].icon)}
          </div>
          <div className='flex-rowpictures'>
            <div className='sunset' /> 
            <div className='sunrise' />
          </div>
          <div className='flex-row-mainweatherextra'>
            <div className='minmaxTemp'>
              <span className='temperature-high'>H: {Math.round(data.weatherData.main.temp_max)}°</span>
              <span className='temperature-low'>L: {Math.round(data.weatherData.main.temp_min)}°</span>
            </div>
            <span className='time-span'>{data.weatherData.sys.sunrise &&(
                        <p> 
                            {(() => {
                                let sunriseTimeStamp = data.weatherData.sys.sunrise;
                                let milliseconds = sunriseTimeStamp * 1000;
                                let dateObject = new Date(milliseconds);
                                let hours =  dateObject.getHours();
                                let minutes = dateObject.getMinutes(); 
                                let check = hours < 12 ? 'AM' : 'PM';
                                hours = hours % 12 || 12;
                                hours = String(hours).padStart(2, '0');
                                minutes = String(minutes).padStart(2, '0');
                                return ` ${hours}:${minutes} ${check}`;
                            })()}
                        </p>
                    )}</span>
              <span className='time-span-2'>{data.weatherData.sys.sunset &&(
                        <p>
                            {(() => {
                                let sunsetTimeStamp = data.weatherData.sys.sunset;
                                let milliseconds = sunsetTimeStamp * 1000;
                                let dateObject = new Date(milliseconds);
                                let hours =  dateObject.getHours();
                                let minutes = dateObject.getMinutes(); 
                                hours = String(hours).padStart(2, '0');
                                minutes = String(minutes).padStart(2, '0');
                                let check = hours < 12 ? 'AM' : 'PM';
                                return ` ${hours}:${minutes} ${check}`;
                            })()}
                        </p>
                    )}</span>
            </div>

            <br></br>

          <div className='flex-row-farmadvice'>
            <div className='rectangle'>
              <div className='farm-advice'>
                <span className='farm-advice-1'>!</span>
                <span className='farm-advice-2'> FARM ADVICE</span>
              </div>
            <div className='advice-text'>
              <span className='custom-advice'>
              Feels Like: {Math.round(data.weatherData.main.feels_like)}°C.<br></br> Rain: {Math.round(data.dayForecast.list[0].pop * 100)}% chance with {isNaN(data.dayForecast.list[1].rain) ? 0 : Math.round(data.dayForecast.list[1].rain)}mm expected. <br></br>

              {analyzeWeatherData(data.weatherData.main.temp, data.weekRain, data.weatherData.main.humidity)[0]}  <br></br> 
              {analyzeWeatherData(data.weatherData.main.temp, data.weekRain, data.weatherData.main.humidity)[1]} <br></br>
              {analyzeWeatherData(data.weatherData.main.temp, data.weekRain, data.weatherData.main.humidity)[2]}
              </span>
            </div>
            </div>
          </div>

            <br></br>

          <div className='flex-row-hourly'>
            <div className='hourly-forecast'>HOURLY FORECAST</div>
            <div className='rectangle-6' />
            <span className='now'>Now</span>
            <div className='time-1'>
              <span className='time-1-1'>{convertEpochTimeToReadable(data.forecast.list[0].dt).hour}</span>
              <span className='time-1-2'>{convertEpochTimeToReadable(data.forecast.list[0].dt).period}</span>
            </div>
            <div className='time-2'>
              <span className='time-2-1'>{convertEpochTimeToReadable(data.forecast.list[1].dt).hour}</span>
              <span className='time-2-2'>{convertEpochTimeToReadable(data.forecast.list[1].dt).period}</span>
            </div>
            <div className='time-3'>
              <span className='time-3-1'>{convertEpochTimeToReadable(data.forecast.list[2].dt).hour}</span>
              <span className='time-3-2'>{convertEpochTimeToReadable(data.forecast.list[2].dt).period}</span>
            </div>
            <div className='time-4'>
              <span className='time-4-1'>{convertEpochTimeToReadable(data.forecast.list[3].dt).hour}</span>
              <span className='time-4-2'>{convertEpochTimeToReadable(data.forecast.list[3].dt).period}</span>
            </div>
            <div className='image-0' style={{backgroundImage: `url(${getWeatherIcon(weatherData.weather[0].icon)})`}}/>
            <div className='image-1' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[1].weather[0].icon)})`}}/>
            <div className='image-2' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[2].weather[0].icon)})`}}/>
            <div className='image-3' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[3].weather[0].icon)})`}}/>
            <div className='image-4' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[4].weather[0].icon)})`}}/>
            <span className='temperature-0'>{Math.round(data.weatherData.main.temp)}°</span>
            <span className='temperature-1'>{kelvinToCelsius(data.forecast.list[0].main.temp)}°</span>
            <span className='temperature-2'>{kelvinToCelsius(data.forecast.list[1].main.temp)}°</span>
            <span className='temperature-3'>{kelvinToCelsius(data.forecast.list[2].main.temp)}°</span>
            <span className='temperature-4'>{kelvinToCelsius(data.forecast.list[3].main.temp)}°</span>
          </div>

          <br></br>

          <div className='flex-row-rainhumidity'>

            <div className='rectangle-rain'/>
              <div className='header-left'>
                <div className='icon-rain' />
                <span className='rainfall'>Rainfall</span>
              </div>
              <span className='in-last-h'>in last 24h</span>
              <span className='empty-16'>{isNaN(data.dayForecast.list[0].rain) ? 0: Math.round(data.dayForecast.list[0].rain)}mm</span>
              <span className='mm-expected-in-next-h'>
                {isNaN(data.dayForecast.list[1].rain) ? 0: Math.round(data.dayForecast.list[1].rain)}mm expected in 24h.
              </span>

            <div className='rectangle-humidity'/>
              <div className='header-right'>
                <div className='icon-humidity' />
                <span className='humidity'>humidity</span>
              </div>
            <span className='percentage'>{data.weatherData.main.humidity}%</span>
            <span className='visibility'>
              Visibility: <br/> {data.weatherData.visibility} m
            </span>
            
          </div>
      {/* End of First page */}
      
      {/* Start of Second page */}
          <br></br>    

          <div className='flex-row-windairquality'>

            <div className='rectangle-wind' />
              <div className='header-left'>
                <div className='icon-wind' />
                <span className='wind'>Wind</span>
              </div>
              <span className='number-12'>{mpstomph(data.weatherData.wind.speed)}</span>
              <span className='number-24'>{mpstomph(data.forecast.list[0].wind.gust)}</span>
              <span className='mph'>mph</span>
              <span className='mph-5'>mph</span>
              <span className='wind-6'>Wind</span>
              <span className='gusts'>Gusts</span>
              <br/>
              <span className='direction'>Wind Direction: <br/> {convert.toCompass(data.weatherData.wind.deg)}</span>
              {/* <span className='nw'>Wind Degrees: <br/> {data.weatherData.wind.deg}°</span> */}

            <div className='rectangle-airquality' />
              <div className='header-right'>
                  <div className='icon-airquality' />
                  <span className='air-quality'>Air quality</span>
              </div>
              <span className='percentage'>AQI: {data.pollution.list[0].main.aqi}</span>
              <span className='visibility'>Pressure: <br></br> {data.weatherData.main.pressure} hPa </span>

          </div>

          <br></br>

          <div className='flex-row-7day'>

            <div className='header-7day'>
              <div className='icon-forecast' />
              <span className='day-forecast'>7-DAY FORECAST</span>
            </div>
            <span className='low'>Low</span>
            <span className='high'>High</span>
            
            <div className='day-0'>
              <div className='flex-row-0'>
                <span className='today'>Today</span>
                <span className='temp-high-0'>{kelvinToCelsius(data.dayForecast.list[0].temp.max)}°</span>
                <div className='imagee' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[0].weather[0].icon)})`}}/>
                <span className='temp-low-0'>{kelvinToCelsius(data.dayForecast.list[0].temp.min )}°</span>
              </div>
              {/* <div className='line-0' /> */}
            </div>

            {/* <div className='union' /> */}

            <div className='day-1'>
              <div className='frame' />
              <div className='flex-row-1'>
               <div className='image-Ca' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[1].weather[0].icon)})`}}/>
                <div className='groupp'>
                  <div className='flex-row-cbd'>
                    <span className='day-mon'>{epochToDay(data.dayForecast.list[1].dt)}</span>
                    <span className='temp-high-1'>{kelvinToCelsius(data.dayForecast.list[1].temp.max)}°</span>
                    <span className='temp-low-1'>{kelvinToCelsius(data.dayForecast.list[1].temp.min)}°</span>
                    <div className='frame-d' />
                  </div>
                  {/* <div className='line-1' /> */}
                </div>
              </div>
            </div>

            <div className='day-2'>
              <div className='flex-row-2'>
                <div className='image-10' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[2].weather[0].icon)})`}}/>
                <span className='day-tue'>{epochToDay(data.dayForecast.list[2].dt)}</span>
                <span className='temp-high-2'>{kelvinToCelsius(data.dayForecast.list[2].temp.max)}°</span>
                <span className='temp-low-2'>{kelvinToCelsius(data.dayForecast.list[2].temp.min)}°</span>
              </div>
              {/* <div className='line-2' /> */}
            </div>

            <div className='day-3'>
              <div className='frame-15' />
              <div className='flex-row-3'>
                <span className='day-wed'>{epochToDay(data.dayForecast.list[3].dt)}</span>
                <span className='temp-high-3'>{kelvinToCelsius(data.dayForecast.list[3].temp.max)}°</span>
                <div className='sunny-color' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[3].weather[0].icon)})`}}/>
                <span className='temp-low-3'>{kelvinToCelsius(data.dayForecast.list[3].temp.min)}°</span>
                <div className='frame-19' />
              </div>
              {/* <div className='line-3' /> */}
            </div>

            <div className='day-4'>
              <div className='frame-1c' />
              <div className='flex-row-4'>
                <span className='span-thu'>{epochToDay(data.dayForecast.list[4].dt)}</span>
                <span className='temp-high-4'>{kelvinToCelsius(data.dayForecast.list[4].temp.max)}°</span>
                <div className='image-1e' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[4].weather[0].icon)})`}}/>
                <span className='temp-low-4'>{kelvinToCelsius(data.dayForecast.list[4].temp.min)}°</span>
                <div className='frame-1f' />
              </div>
              {/* <div className='line-4' /> */}
            </div>

            <div className='day-5'>
              <div className='flex-row-5'>
                <span className='span-fri'>{epochToDay(data.dayForecast.list[5].dt)}</span>
                <span className='temp-high-5'>{kelvinToCelsius(data.dayForecast.list[5].temp.max)}°</span>
                <div className='image-23' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[5].weather[0].icon)})`}}/>
                <span className='temp-low-5'>{kelvinToCelsius(data.dayForecast.list[5].temp.min)}°</span>
                <div className='frame-24' />
              </div>
              {/* <div className='line-5' /> */}
            </div>

            <div className='day-6'>
              <div className='flex-row-6'>
                <span className='span-sat'>{epochToDay(data.dayForecast.list[6].dt)}</span>
                <span className='temp-high-6'>{kelvinToCelsius(data.dayForecast.list[6].temp.max)}°</span>
                <div className='image-29' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[6].weather[0].icon)})`}}/>
                <span className='temp-low-6'>{kelvinToCelsius(data.dayForecast.list[6].temp.min)}°</span>
              </div>
              {/* <div className='line-6' /> */}
            </div>

            <div className='day-7'>
              <div className='frame-2d' />
              <div className='flex-row-7'>
                <span className='sun'>{epochToDay(data.dayForecast.list[7].dt)}</span>
                <span className='temp-high-7'>{kelvinToCelsius(data.dayForecast.list[7].temp.max)}°</span>
                <div className='image-30' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[7].weather[0].icon)})`}}/>
                <span className='temp-low-7'>{kelvinToCelsius(data.dayForecast.list[7].temp.min)}°</span>
                <div className='frame-32' />
              </div>
              {/* <div className='line-7' /> */}
            </div>
          </div>

          <br></br>

          <div className='flex-row-severeweather'>
            <div className='header-severeweather'>
              <span className='severe-weather'>severe weather </span>
            </div>
            <span className='severe-alert'>
              {extremeWeather(data.weatherData.temp, data.weatherData.precipitation)}
            </span>
            <div className='rectangle-35' />
          </div>
          <br/>
          {/* Historical Data */}
          <div className='flex-row-historical'>
          <div className='historical-data'>LAST FIVE DAYS</div>
            <div className='historical-data-box' />
            <div className='pm-6-text'>
              <span className='time-6'>{convertToDate(data.historical[Object.keys(data.historical)[0]][0].dt)}</span>
            </div>
            <div className='pm-7-text'>
              <span className='time-7'>{convertToDate(data.historical[Object.keys(data.historical)[1]][0].dt)}</span>
            </div>
            <div className='pm-8-text'>
              <span className='time-8'>{convertToDate(data.historical[Object.keys(data.historical)[2]][0].dt)}</span>
            </div>
            <div className='pm-9-text'>
              <span className='time-9'>{convertToDate(data.historical[Object.keys(data.historical)[3]][0].dt)}</span>
            </div>
            <div className='pm-10-text'>
              <span className='time-10'>{convertToDate(data.historical[Object.keys(data.historical)[4]][0].dt)}</span>
            </div>
            {/* <div className='img1' style={{backgroundImage: `url(${getWeatherIcon(data.historical[Object.keys(data.historical)[0]][0].weather[0].icon)})` }}/>
            <div className='img2' style={{backgroundImage: `url(${getWeatherIcon(data.historical[Object.keys(data.historical)[1]][0].weather[0].icon)})` }}/>
            <div className='img3' style={{backgroundImage: `url(${getWeatherIcon(data.historical[Object.keys(data.historical)[2]][0].weather[0].icon)})` }}/>
            <div className='img4' style={{backgroundImage: `url(${getWeatherIcon(data.historical[Object.keys(data.historical)[3]][0].weather[0].icon)})` }}/>
            <div className='img5' style={{backgroundImage: `url(${getWeatherIcon(data.historical[Object.keys(data.historical)[4]][0].weather[0].icon)})` }}/> */}

            <span className='pm-6-temp'>{kelvinToCelsius(calcAvgData(getTemps(data.historical, 0)))}°</span>
            <span className='pm-7-temp'>{kelvinToCelsius(calcAvgData(getTemps(data.historical, 1)))}°</span>
            <span className='pm-8-temp'>{kelvinToCelsius(calcAvgData(getTemps(data.historical, 2)))}°</span>
            <span className='pm-9-temp'>{kelvinToCelsius(calcAvgData(getTemps(data.historical, 3)))}°</span>
            <span className='pm-10-temp'>{kelvinToCelsius(calcAvgData(getTemps(data.historical, 4)))}°</span>
      
            <span className='pm-6-rain'>{calcAvgData(getRains(data.historical, 0))}mm</span>
            <span className='pm-7-rain'>{calcAvgData(getRains(data.historical, 1))}mm</span>
            <span className='pm-8-rain'>{calcAvgData(getRains(data.historical, 2))}mm</span>
            <span className='pm-9-rain'>{calcAvgData(getRains(data.historical, 3))}mm</span>
            <span className='pm-10-rain'>{calcAvgData(getRains(data.historical, 4))}mm</span>
            
            <span className='pm-6-wind'>{mpstomph(calcAvgData(getWinds(data.historical, 0)))}mph</span>
            <span className='pm-7-wind'>{mpstomph(calcAvgData(getWinds(data.historical, 1)))}mph</span>
            <span className='pm-8-wind'>{mpstomph(calcAvgData(getWinds(data.historical, 2)))}mph</span>
            <span className='pm-9-wind'>{mpstomph(calcAvgData(getWinds(data.historical, 3)))}mph</span>
            <span className='pm-10-wind'>{mpstomph(calcAvgData(getWinds(data.historical, 4)))}mph</span>
          </div>
          {/* End of second page */}
          </>
            ): null}
        </>
        )}
    </div>
  );
}
export default Weather;
