import './index.css';
import React, {useEffect, useState} from "react";
import axios from 'axios'; 

import clearicon from './assets/images/7bcb4423-711b-486f-8d28-6246d22692ec.png'
import cloudicon from './assets/images/c4f454dd13c9f05bb127c07767fba04b7dc23272.png'
import rainicon from './assets/images/d7761747446ce7d1b58b5773cc5c963f939cc45f.png'
import defaulticon from './assets/images/7bcb4423-711b-486f-8d28-6246d22692ec.png'
import thundericon from './assets/images/c9cb1b38a28412be84d8d3df8e162f5f0359e2ba.png'

// Converts epoch time to hours and AM/PM separately
export const convertEpochTimeToReadable = (epochTime) => {
  const date = new Date(epochTime * 1000); // Convert seconds to milliseconds
  const hours = date.getHours();
  const hour = hours % 12 || 12; // Convert 0 (midnight) to 12 and keep 1-11 as is
  const period = hours < 12 ? 'AM' : 'PM';

  return { hour, period };
};
function epochToDay(epoch) {
  var date = new Date(epoch * 1000);
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var dayOfWeek = days[date.getDay()];
  return dayOfWeek;
}
export function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}
function mpstomph(metersPerSecond) {
  const milesPerHour = metersPerSecond * 2.23694;
  return Math.round(milesPerHour);
}


const Weather = () => {
  // (remove comment below when running it with the developer plan when functionality is made)
  // eslint-disable-next-line 
  const[API, setAPI] = useState("51326c1d8dd29acfc399a1c78b2b21b7")
  const[loading, setloading] = useState(false);
  const[initialSearch, setinitialSearch] = useState(false);
  const[city, setCity] = useState("");
  const[weatherData, setWeatherData] = useState(null);
  const [data, setData] = useState({ forecast: null, weatherData: null , pollution: null, dayForecast: null});
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
        const historicals = await axios.get(
          `https://history.openweathermap.org/data/2.5/history/city?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=51326c1d8dd29acfc399a1c78b2b21b7`
        );

        // Update state
        setWeatherData(response.data);
        setData(prevState => ({
          ...prevState,
          weatherData: response.data,
          forecast: forecasts.data,
          pollution: pollutions.data,
          dayForecast: dayForecasts.data,
          historical: historicals.data
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
    'Clear': clearicon,
    'Clouds': cloudicon,
    'Rain': rainicon,
    'Thunder' : thundericon
  };
  
  const getWeatherIcon = (condition) => {
    return iconMapping[condition] || defaulticon; // Use a default icon as a fallback
  };


  return (
    <div className='main-container'>
      {loading ? (
            <p>Loading Weather Data...</p>
        ) : (
          <>
            {!initialSearch && (
                <div className={`initial-screen`}>
                  <h1>Welcome to CropCast</h1>
                  <p>Empowering Farmers with Precision Weather Forecasting</p>
                </div>
            )}
      
      <form onSubmit={handleSubmit} className={`searchbar ${initialSearch ? 'functional-screen': 'initial-screen'}`}>
            <input
            type="text"
            placeholder="Enter city name"
           value={city}
            onChange={handleInputChange}
            />
          <span className='search-icon'></span>
          <button type="submit" className="searchbutton">Get Weather</button>
      </form>
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
              backgroundImage: `url(${getWeatherIcon(weatherData.weather[0].main)})`}}/> {/*Main image is this*/}
            <span className='mainweather-temp'>{Math.round(data.weatherData.main.temp)}°</span>
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
            <div className='rectangle' />
            <div className='farm-advice'>
              <span className='farm-advice-1'>!</span>
              <span className='farm-advice-2'> FARM ADVICE</span>
            </div>
            <div className='advice-text'>
              <span className='rain-advice'>
              Feels Like: {Math.round(data.weatherData.main.feels_like)}°C. {data.dayForecast.list[0].pop * 100}% chance of rain with {data.dayForecast.list[1].rain}mm expected in the next 24 hours.
              </span>
              <span className='custom-advice'>
              Consider laying mulch around your crops as a protective measure. 🌱
              </span>
            </div>
          </div>

            <br></br>

          <div className='flex-row-hourly'>
            <div className='hourly-forecast'>Hourly forecast</div>
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
            <div className='image-0' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[0].weather[0].main)})`}}/>
            <div className='image-1' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[1].weather[0].main)})`}}/>
            <div className='image-2' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[2].weather[0].main)})`}}/>
            <div className='image-3' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[3].weather[0].main)})`}}/>
            <div className='image-4' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[4].weather[0].main)})`}}/>
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
              <span className='nw'>Wind Degrees: <br/> {data.weatherData.wind.deg}°</span>

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
                <div className='imagee' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[0].weather[0].main)})`}}/>
                <span className='temp-low-0'>{kelvinToCelsius(data.dayForecast.list[0].temp.min )}°</span>
              </div>
              {/* <div className='line-0' /> */}
            </div>

            {/* <div className='union' /> */}

            <div className='day-1'>
              <div className='frame' />
              <div className='flex-row-1'>
               <div className='image-Ca' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[1].weather[0].main)})`}}/>
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
                <div className='image-10' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[2].weather[0].main)})`}}/>
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
                <div className='sunny-color' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[3].weather[0].main)})`}}/>
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
                <div className='image-1e' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[4].weather[0].main)})`}}/>
                <span className='temp-low-4'>{kelvinToCelsius(data.dayForecast.list[4].temp.min)}°</span>
                <div className='frame-1f' />
              </div>
              {/* <div className='line-4' /> */}
            </div>

            <div className='day-5'>
              <div className='flex-row-5'>
                <span className='span-fri'>{epochToDay(data.dayForecast.list[5].dt)}</span>
                <span className='temp-high-5'>{kelvinToCelsius(data.dayForecast.list[5].temp.max)}°</span>
                <div className='image-23' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[5].weather[0].main)})`}}/>
                <span className='temp-low-5'>{kelvinToCelsius(data.dayForecast.list[5].temp.min)}°</span>
                <div className='frame-24' />
              </div>
              {/* <div className='line-5' /> */}
            </div>

            <div className='day-6'>
              <div className='flex-row-6'>
                <span className='span-sat'>{epochToDay(data.dayForecast.list[6].dt)}</span>
                <span className='temp-high-6'>{kelvinToCelsius(data.dayForecast.list[6].temp.max)}°</span>
                <div className='image-29' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[6].weather[0].main)})`}}/>
                <span className='temp-low-6'>{kelvinToCelsius(data.dayForecast.list[6].temp.min)}°</span>
              </div>
              {/* <div className='line-6' /> */}
            </div>

            <div className='day-7'>
              <div className='frame-2d' />
              <div className='flex-row-7'>
                <span className='sun'>{epochToDay(data.dayForecast.list[7].dt)}</span>
                <span className='temp-high-7'>{kelvinToCelsius(data.dayForecast.list[7].temp.max)}°</span>
                <div className='image-30' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[7].weather[0].main)})`}}/>
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
              Heavy thunderstorm expected
              at 16:00 on <br />22/02/2024
            </span>
            <div className='rectangle-35' />
          </div>
          <br/>
          {/* Historical Data */}
          <div className='flex-row-historical'>
            <div className='historical-data'>YESTERDAY'S DATA</div>
            <div className='historical-data-box' />
            <span className='pm-6'>Now</span>
            <div className='pm-7-text'>
              <span className='time-7'>{convertEpochTimeToReadable(data.forecast.list[0].dt).hour}</span>
              <span className='pm-7-historical'>{convertEpochTimeToReadable(data.forecast.list[0].dt).period}</span>
            </div>
            <div className='pm-8-text'>
              <span className='time-8'>{convertEpochTimeToReadable(data.forecast.list[1].dt).hour}</span>
              <span className='pm-8-historical'>{convertEpochTimeToReadable(data.forecast.list[1].dt).period}</span>
            </div>
            <div className='pm-9-text'>
              <span className='time-9'>{convertEpochTimeToReadable(data.forecast.list[2].dt).hour}</span>
              <span className='pm-9-historical'>{convertEpochTimeToReadable(data.forecast.list[2].dt).period}</span>
            </div>
            <div className='pm-10-text'>
              <span className='time-10'>{convertEpochTimeToReadable(data.forecast.list[3].dt).hour}</span>
              <span className='pm-10-historical'>{convertEpochTimeToReadable(data.forecast.list[3].dt).period}</span>
            </div>
            <div className='img1' style={{backgroundImage: `url(${getWeatherIcon(data.historical.list[0].weather[0].main)})` }}/>
            <div className='img2' style={{backgroundImage: `url(${getWeatherIcon(data.historical.list[1].weather[0].main)})` }}/>
            <div className='img3' style={{backgroundImage: `url(${getWeatherIcon(data.historical.list[2].weather[0].main)})` }}/>
            <div className='img4' style={{backgroundImage: `url(${getWeatherIcon(data.historical.list[3].weather[0].main)})` }}/>
            <div className='img5' style={{backgroundImage: `url(${getWeatherIcon(data.historical.list[4].weather[0].main)})` }}/>

            <span className='pm-6-temp'>{kelvinToCelsius(data.historical.list[0].main.temp)}°</span>
            <span className='pm-7-temp'>{kelvinToCelsius(data.historical.list[1].main.temp)}°</span>
            <span className='pm-8-temp'>{kelvinToCelsius(data.historical.list[2].main.temp)}°</span>
            <span className='pm-9-temp'>{kelvinToCelsius(data.historical.list[3].main.temp)}°</span>
            <span className='pm-10-temp'>{kelvinToCelsius(data.historical.list[4].main.temp)}°</span>
      
            <span className='pm-6-rain'>{data.historical.list[0]?.rain?.['1h'] !== undefined ? data.historical.list[0]?.rain?.['1h'] + 'mm' : '0mm'}</span>
            <span className='pm-7-rain'>{data.historical.list[1]?.rain?.['1h'] !== undefined ? data.historical.list[1]?.rain?.['1h'] + 'mm' : '0mm'}</span>
            <span className='pm-8-rain'>{data.historical.list[2]?.rain?.['1h'] !== undefined ? data.historical.list[2]?.rain?.['1h'] + 'mm' : '0mm'}</span>
            <span className='pm-9-rain'>{data.historical.list[3]?.rain?.['1h'] !== undefined ? data.historical.list[3]?.rain?.['1h'] + 'mm' : '0mm'}</span>
            <span className='pm-10-rain'>{data.historical.list[4]?.rain?.['1h'] !== undefined ? data.historical.list[4]?.rain?.['1h'] + 'mm' : '0mm'}</span>
          
            <span className='pm-6-wind'>{mpstomph(data.historical.list[0].wind.speed)}mph</span>
            <span className='pm-7-wind'>{mpstomph(data.historical.list[1].wind.speed)}mph</span>
            <span className='pm-8-wind'>{mpstomph(data.historical.list[2].wind.speed)}mph</span>
            <span className='pm-9-wind'>{mpstomph(data.historical.list[3].wind.speed)}mph</span>
            <span className='pm-10-wind'>{mpstomph(data.historical.list[4].wind.speed)}mph</span>
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
