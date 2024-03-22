import React from "react";
// Component used to represent all the farm advice below the main city information
const FarmAdvice = ({data, weatherData, analyzeWeatherData}) => {
    return (
        <div className='flex-row-farmadvice'>
          {/* Main flex row for all farm advice box*/}
            <div className='rectangle'>
              <div className='farm-advice'>
                {/* Title of the box */}
                <span className='farm-advice-1'>!</span>
                <span className='farm-advice-2'> FARM ADVICE</span>
              </div>
            <div className='advice-text'>
              <span className='custom-advice'>
              {/* Displays the information using current weather data of city that has been processed through analyzeWeatherData method */}
              Feels Like: {Math.round(data.weatherData.main.feels_like)}°C.<br></br> Rain: {Math.round(data.dayForecast.list[0].pop * 100)}% chance with {isNaN(data.dayForecast.list[1].rain) ? 0 : Math.round(data.dayForecast.list[1].rain)}mm expected. <br></br>

              {analyzeWeatherData(data.weatherData.main.temp, data.weekRain, data.weatherData.main.humidity)[0]} <br></br> 
              {analyzeWeatherData(data.weatherData.main.temp, data.weekRain, data.weatherData.main.humidity)[1]} <br></br>
              {analyzeWeatherData(data.weatherData.main.temp, data.weekRain, data.weatherData.main.humidity)[2]}
              </span>
            </div>
            </div>
        </div>
    );
};

export default FarmAdvice; 


