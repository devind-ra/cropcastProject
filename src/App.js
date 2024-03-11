import './index.css';
import React, {useEffect, useState} from "react";
import axios from 'axios'; 

// Converts epoch time to hours and AM/PM separately
export const convertEpochTimeToReadable = (epochTime) => {
  const date = new Date(epochTime * 1000); // Convert seconds to milliseconds
  const hours = date.getHours();
  const hour = hours % 12 || 12; // Convert 0 (midnight) to 12 and keep 1-11 as is
  const period = hours < 12 ? 'AM' : 'PM';

  return { hour, period };
};



const Weather = () => {
  const[city, setCity] = useState("");
  const[weatherData, setWeatherData] = useState(null);
  const [coords, setCoord] = useState({ lat: 0, lon: 0 });

  const[lat, setLat] = useState(0);
  const[lon, setLon] = useState(0);
  const[forecast, setForecast] = useState(null);

  const fetchData = async () =>{
    if (city !== "") {
      try{
          const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b232c27ecc0088cdf71e7dd1310d7fab` // eslint-disable-line no-template-curly-in-string
          );
          setWeatherData(response.data)
          console.log("weather");
          console.log("data coord",response.data.coord.lat, response.data.coord.lon);
          setCoord({ lat: response.data.coord.lat, lon: response.data.coord.lon });
          setLon(response.data.coord.lon);
          setLat(response.data.coord.lat);
          console.log("lat", lat);
          console.log("lon", lon);
          console.log("coord", coords);
          console.log(response.data);
      
          fetchForecast();
      }catch(error){
          console.error(error)
      }
    }
  };

  const fetchForecast = async () =>{
      try{
          console.log("coords", lat, lon);
          const response = await axios.get(
            //`https://api.openweathermap.org/data/2.5/forecast?lat=51.5085&lon=-0.1257&appid=b232c27ecc0088cdf71e7dd1310d7fab`
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b232c27ecc0088cdf71e7dd1310d7fab` // eslint-disable-line no-template-curly-in-string
          );
          setForecast(response.data)
          console.log("forecast");
          console.log(response.data);
          console.log(response.data.list[0]);
      }catch(error){
          console.error(error)
      }

  };
  useEffect(()=>{
      fetchData();
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleInputChange = (e) =>{
      setCity(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      fetchData(); 
  };  
  return (
     
    <div className='main-container'>
      <form onSubmit={handleSubmit}>
          <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
      />
      <button type="submit">Get Weather</button>
      </form>
      {weatherData ? (
          <>

          
              


      
      {/* First page */}
      <div className='search' />
      <div className='flex-row-ae'>
        <div className='leaf' />
        <span className='london'>{weatherData.name}</span>
      </div>
      <div className='flex-row-f'>
        <span className='mostly-clear'>{weatherData.weather[0].description}</span>
        <div className='group' />
        <span className='degree'>{weatherData.main.temp} °C</span>
      </div>
      <div className='sunset' />
      <div className='flex-row-f-1'>
        <div className='regroup'>
          <span className='temperature-high'>H: {weatherData.main.temp_max} °C</span>
          <span className='temperature-low'>L: {weatherData.main.temp_min} °C</span>
        </div>
        <span className='time-span'>{weatherData.sys.sunrise &&(
                        <p> 
                            {(() => {
                                let sunriseTimeStamp = weatherData.sys.sunrise;
                                let milliseconds = sunriseTimeStamp * 1000;
                                let dateObject = new Date(milliseconds);
                                let hours =  dateObject.getHours();
                                let minutes = dateObject.getMinutes(); 
                                let check = hours < 12 ? 'AM' : 'PM';
                                hours = hours % 12 || 12;
                                return ` ${hours}:${minutes} ${check}`;
                            })()}
                        </p>
                    )}</span>
        <span className='time-span-2'>{weatherData.sys.sunset &&(
                        <p>
                            {(() => {
                                let sunsetTimeStamp = weatherData.sys.sunset;
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
      <div className='flex-row-ca'>
        <div className='rectangle' />
        <div className='farm-advice'>
          <span className='farm-advice-3'>! </span>
          <span className='farm-advice-4'> FARM ADVICE</span>
        </div>
        <div className='rain-advice'>
          <span className='rain-advice-5'>
            Feels Like: {weatherData.main.feels_like} °C. 80% chance of rain with 20mm expected in the next 24 hours.
            <br />
          </span>
          <span className='mulch-advice'>
            Consider laying mulch around your crops as a protective measure. 🌱
          </span>
        </div>
      </div>
      <div className='flex-row-fa'>
        <div className='hourly-forecast'>Hourly forecast</div>
        <div className='line' />
        <div className='rectangle-6' />
        <span className='now'>Now</span>
        <div className='pm'>
          <span className='time-10'>10</span>
          <span className='pm-7'>PM</span>
        </div>
        <div className='pm-8'>
          <span className='time-11'>11</span>
          <span className='pm-9'>PM</span>
        </div>
        <div className='am'>
          <span className='time-12a'>12</span>
          <span className='m'>AM</span>
        </div>
        <div className='am-a'>
          <span className='time-1a'>1</span>
          <span className='m-b'>AM</span>
        </div>
        <div className='image' />
        <div className='image-c' />
        <div className='image-d' />
        <div className='image-e' />
        <div className='image-f' />
        <span className='temperature-21'>{weatherData.main.temp}</span>
        <span className='temperature-21-10'>21°</span>
        <span className='temperature-19'>19°</span>
        <span className='temperature-19-11'>19°</span>
        <span className='temperature-19-12'>19°</span>
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
        <span className='empty-16'>13</span>
        <span className='mm'>mm</span>
        <span className='percentage'>{weatherData.main.humidity} %</span>
        <span className='in-last-h'>in last 24h</span>
        <span className='mm-expected-in-next-h'>
          4 mm expected
          <br />
          in next 24h.
        </span>
        <span className='dew-point'>
          The dew point is
          <br />
          10° right now.
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
        <span className='percentage'>{weatherData.visibility} m </span>
        <span className='dew-point'>pressure: {weatherData.main.pressure} hPa </span>

        <span className='number-12'>{weatherData.wind.speed}</span>
        <span className='number-24'>24</span>
        <span className='mph'>mph</span>
        <span className='mph-5'>mph</span>
        <span className='wind-6'>Wind</span>
        <span className='gusts'>Gusts</span>
        <span className='nw'>{weatherData.wind.deg} °</span>
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
            <span className='degreez'>23°</span>
            <div className='imagee' />
            <span className='degree-9'>15°</span>
          </div>
          <div className='line-a' />
        </div>
        <div className='union' />
        <div className='list-b'>
          <div className='frame' />
          <div className='flex-row-cc'>
            <div className='image-Ca' />
            <div className='groupp'>
              <div className='flex-row-cbd'>
                <span className='day-mon'>Mon</span>
                <span className='temperature--high'>27°</span>
                <span className='temperature--low'>18°</span>
                <div className='frame-d' />
              </div>
              <div className='line-e' />
            </div>
          </div>
        </div>
        <div className='list-f'>
          <div className='flex-row-b'>
            <div className='image-10' />
            <span className='day-tue'>Tue</span>
            <span className='temperature-high-11'>25°</span>
            <span className='temperature-low-12'>20°</span>
          </div>
          <div className='line-13' />
        </div>
        <div className='list-14'>
          <div className='frame-15' />
          <div className='flex-row-b-16'>
            <span className='day-wed'>Wed</span>
            <span className='temperature-high-17'>25°</span>
            <div className='sunny-color' />
            <span className='temperature-low-18'>17°</span>
            <div className='frame-19' />
          </div>
          <div className='line-1a' />
        </div>
        <div className='list-1b'>
          <div className='frame-1c' />
          <div className='flex-row-d-1d'>
            <span className='span-thu'>Thu</span>
            <span className='span-25'>25°</span>
            <div className='image-1e' />
            <span className='span-17'>17°</span>
            <div className='frame-1f' />
          </div>
          <div className='line-20' />
        </div>
        <div className='list-21'>
          <div className='flex-row-22'>
            <span className='span-fri'>Fri</span>
            <span className='span-26'>26°</span>
            <div className='image-23' />
            <span className='span-20'>20°</span>
            <div className='frame-24' />
          </div>
          <div className='line-25' />
        </div>
        <div className='list-26'>
          <div className='flex-row-27'>
            <span className='span-sat'>Sat</span>
            <span className='span-25-28'>25°</span>
            <div className='image-29' />
            <span className='degree-2a'>18°</span>
          </div>
          <div className='line-2b' />
        </div>
        <div className='list-2c'>
          <div className='frame-2d' />
          <div className='flex-row-b-2e'>
            <span className='sun'>Sun</span>
            <span className='degree-2f'>21°</span>
            <div className='image-30' />
            <span className='degree-31'>13°</span>
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
      {/* End of second page */}
      </>
        ):(
          <p>Loading Weather data...</p>
      )}

    </div>
    
  );
  
  
}
export default Weather; 