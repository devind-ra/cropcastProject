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
  const[API, setAPI] = useState("51326c1d8dd29acfc399a1c78b2b21b7")
  const[city, setCity] = useState("");
  const[weatherData, setWeatherData] = useState(null);
  const [data, setData] = useState({ forecast: null, weatherData: null , pollution: null, dayForecast: null});
  console.log("data", data);


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
      } catch (error) {
        console.error(error);
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
      <form onSubmit={handleSubmit} className='searchbar'>
        <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {console.log("weatherData after form", weatherData)}
      {console.log("data after form", data)}
      { data && weatherData ? (
          <>
          {/* First page */}
          {/* <div className='search' /> */}
          <div className='flex-row-city'>
            <div className='leaf' />
            {console.log("name", data.weatherData.name)}
            {console.log(data.forecast.city.name)}
            <span className='city'>{data.weatherData.name}</span>
          </div>
          <div className='flex-row-maindescription'>
            <span className='mainweather-description'>{data.weatherData.weather[0].description}</span>
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
            <div className='flex-row-farmadvice'>
              <div className='rectangle' />
              <div className='farm-advice'>
                <span className='farm-advice-3'>!</span>
                <span className='farm-advice-4'> FARM ADVICE</span>
              </div>
              <div className='rain-advice'>
                <span className='rain-advice-5'>
                Feels Like: {data.weatherData.main.feels_like}°C. {data.dayForecast.list[0].pop * 100}% chance of rain with {data.dayForecast.list[1].rain}mm expected in the next 24 hours.
                </span>
                <span className='mulch-advice'>
                Consider laying mulch around your crops as a protective measure. 🌱
                </span>
              </div>
            </div>
            <div className='flex-row-hourly'>
              <div className='hourly-forecast'>Hourly forecast</div>
                  {/*<div className='line' /> */}
              <div className='rectangle-6' />
              <span className='now'>Now</span>
              <div className='pm'>
                <span className='time-10'>{convertEpochTimeToReadable(data.forecast.list[0].dt).hour}</span>
                <span className='pm-7'>{convertEpochTimeToReadable(data.forecast.list[0].dt).period}</span>
              </div>
              <div className='pm-8'>
                <span className='time-11'>{convertEpochTimeToReadable(data.forecast.list[1].dt).hour}</span>
                <span className='pm-9'>{convertEpochTimeToReadable(data.forecast.list[1].dt).period}</span>
              </div>
              <div className='am'>
                <span className='time-12a'>{convertEpochTimeToReadable(data.forecast.list[2].dt).hour}</span>
                <span className='m'>{convertEpochTimeToReadable(data.forecast.list[2].dt).period}</span>
              </div>
              <div className='am-a'>
                <span className='time-1a'>{convertEpochTimeToReadable(data.forecast.list[3].dt).hour}</span>
                <span className='m-b'>{convertEpochTimeToReadable(data.forecast.list[3].dt).period}</span>
              </div>
              <div className='image' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[0].weather[0].main)})`}}/>
              <div className='image-c' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[1].weather[0].main)})`}}/>
              <div className='image-d' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[2].weather[0].main)})`}}/>
              <div className='image-e' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[3].weather[0].main)})`}}/>
              <div className='image-f' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[4].weather[0].main)})`}}/>
              <span className='temperature-21'>{Math.round(data.weatherData.main.temp)}°</span>
              <span className='temperature-21-10'>{kelvinToCelsius(data.forecast.list[0].main.temp)}°</span>
              <span className='temperature-19'>{kelvinToCelsius(data.forecast.list[1].main.temp)}°</span>
              <span className='temperature-19-11'>{kelvinToCelsius(data.forecast.list[2].main.temp)}°</span>
              <span className='temperature-19-12'>{kelvinToCelsius(data.forecast.list[3].main.temp)}°</span>
            </div>
            <div className='flex-row-c'>
              <div className='rectangle-13' />
              <div className='rectangle-14' />
              <div className='auto-layout-horizontal'>
                <div className='icon' />
                <span className='rainfall'>Rainfall</span>
              </div>
              <div className='auto-layout-horizontal-15'>
                <div className='empty' />
                <span className='humidity'>humidity</span>
              </div>
              <span className='empty-16'>{Math.round(data.dayForecast.list[0].rain)}mm</span>
              <span className='percentage'>{data.weatherData.main.humidity}%</span>
              <span className='in-last-h'>in last 24h</span>
        <span className='mm-expected-in-next-h'>
        {Math.round(data.dayForecast.list[1].rain)}mm expected in 24h.
        </span>
         <span className='dew-point'>
          Visibility: {data.weatherData.visibility} m
        </span>
            </div>
      {/* End of First page */}
      
      {/* Start of Second page */}
      
            <div className='flex-row-d'>
              <div className='rectanglez' />
              <div className='rectangle-1' />
              <div className='auto-layout-horizontal'>
                <div className='icon' />
                <span className='wind'>Wind</span>
              </div>
              <div className='auto-layout-horizontal-15'>
                <div className='auto-layout-horizontal-3'>
                  <div className='icon-4' />
                  <span className='air-quality'>Air quality</span>
                </div>
              </div>

              <div className='line' />
                <span className='percentage'>{data.pollution.list[0].main.aqi}</span>
                <span className='dew-point'>Pressure: <br></br> {data.weatherData.main.pressure} hPa </span>
                <span className='number-12'>{mpstomph(data.weatherData.wind.speed)}</span>
                <span className='number-24'>{mpstomph(data.forecast.list[0].wind.gust)}</span>
                <span className='mph'>mph</span>
                <span className='mph-5'>mph</span>
                <span className='wind-6'>Wind</span>
                <span className='gusts'>Gusts</span>
                <span className='nw'>{data.weatherData.wind.deg}°</span>
              </div>
              <div className='flex-row-bec'>
                <div className='list' />
                <div className='auto-layout-horizontal-7'>
                <div className='pic-4' />
                <span className='day-forecast'>7-DAY FORECAST</span>
              </div>
              <span className='low'>Low</span>
              <span className='high'>High</span>
              <div className='list-8'>
                <div className='flex-row'>
                  <span className='today'>Today</span>
                  <span className='degreez'>{kelvinToCelsius(data.dayForecast.list[0].temp.max)}°</span>
                  <div className='imagee' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[0].weather[0].main)})`}}/>
                  <span className='degree-9'>{kelvinToCelsius(data.dayForecast.list[0].temp.min )}°</span>
                </div>
                <div className='line-a' />
              </div>
        <div className='union' />
        <div className='list-b'>
          <div className='frame' />
          <div className='flex-row-cc'>
            <div className='image-Ca' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[1].weather[0].main)})`}}/>
            <div className='groupp'>
              <div className='flex-row-cbd'>
                <span className='day-mon'>{epochToDay(data.dayForecast.list[1].dt)}</span>
                <span className='temperature--high'>{kelvinToCelsius(data.dayForecast.list[1].temp.max)}°</span>
                <span className='temperature--low'>{kelvinToCelsius(data.dayForecast.list[1].temp.min)}°</span>
                <div className='frame-d' />
              </div>
              <div className='line-e' />
            </div>
          </div>
        </div>
        <div className='list-f'>
          <div className='flex-row-b'>
            <div className='image-10' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[2].weather[0].main)})`}}/>
            <span className='day-tue'>{epochToDay(data.dayForecast.list[2].dt)}</span>
            <span className='temperature-high-11'>{kelvinToCelsius(data.dayForecast.list[2].temp.max)}°</span>
            <span className='temperature-low-12'>{kelvinToCelsius(data.dayForecast.list[2].temp.min)}°</span>
          </div>
          <div className='line-13' />
        </div>
        <div className='list-14'>
          <div className='frame-15' />
          <div className='flex-row-b-16'>
            <span className='day-wed'>{epochToDay(data.dayForecast.list[3].dt)}</span>
            <span className='temperature-high-17'>{kelvinToCelsius(data.dayForecast.list[3].temp.max)}°</span>
            <div className='sunny-color' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[3].weather[0].main)})`}}/>
            <span className='temperature-low-18'>{kelvinToCelsius(data.dayForecast.list[3].temp.min)}°</span>
            <div className='frame-19' />
          </div>
          <div className='line-1a' />
        </div>
        <div className='list-1b'>
          <div className='frame-1c' />
          <div className='flex-row-d-1d'>
            <span className='span-thu'>{epochToDay(data.dayForecast.list[4].dt)}</span>
            <span className='span-25'>{kelvinToCelsius(data.dayForecast.list[4].temp.max)}</span>
            <div className='image-1e' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[4].weather[0].main)})`}}/>
            <span className='span-17'>{kelvinToCelsius(data.dayForecast.list[4].temp.min)}</span>
            <div className='frame-1f' />
          </div>
          <div className='line-20' />
        </div>
        <div className='list-21'>
          <div className='flex-row-22'>
            <span className='span-fri'>{epochToDay(data.dayForecast.list[5].dt)}</span>
            <span className='span-26'>{kelvinToCelsius(data.dayForecast.list[5].temp.max)}°</span>
            <div className='image-23' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[5].weather[0].main)})`}}/>
            <span className='span-20'>{kelvinToCelsius(data.dayForecast.list[5].temp.min)}°</span>
            <div className='frame-24' />
          </div>
          <div className='line-25' />
        </div>
        <div className='list-26'>
          <div className='flex-row-27'>
            <span className='span-sat'>{epochToDay(data.dayForecast.list[6].dt)}</span>
            <span className='span-25-28'>{kelvinToCelsius(data.dayForecast.list[6].temp.max)}°</span>
            <div className='image-29' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[6].weather[0].main)})`}}/>
            <span className='degree-2a'>{kelvinToCelsius(data.dayForecast.list[6].temp.min)}°</span>
          </div>
          <div className='line-2b' />
        </div>
        <div className='list-2c'>
          <div className='frame-2d' />
          <div className='flex-row-b-2e'>
            <span className='sun'>{epochToDay(data.dayForecast.list[7].dt)}</span>
            <span className='degree-2f'>{kelvinToCelsius(data.dayForecast.list[7].temp.max)}°</span>
            <div className='image-30' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[7].weather[0].main)})`}}/>
            <span className='degree-31'>{kelvinToCelsius(data.dayForecast.list[7].temp.min)}°</span>
            <div className='frame-32' />
          </div>
          <div className='line-33' />
        </div>
      </div>
      <div className='flex-row-c-a'>
        <div className='auto-layout-horizontal-34'>
          <span className='severe-weather'>severe weather </span>
        </div>
        <span className='heavy-thunderstorm'>
          Heavy thunderstorm expected
          at 16:00 on <br />22/02/2024
        </span>
        <div className='rectangle-35' />
      </div>
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
        ):(
          <p>Loading Weather data...</p>
      )}

    </div>
    
  );
  
  
}
export default Weather; 
