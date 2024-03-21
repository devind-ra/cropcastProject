import React from "react";

const FarmAdvice = ({data, weatherData, analyzeWeatherData}) => {
    return (
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
    );
};

export default FarmAdvice; 


