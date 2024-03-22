import React from "react";
import { analyzeWeatherData } from "../adviceandalerts";
// Component used to represent farm advice 
const FarmAdvice = ({data}) => {
    return (
        <div className='flex-row-farmadvice'>
          {/* Flex row to ensure all data is mentioned for farmers needs*/}
            <div className='rectangle'>
              {/* Title for the farmers advice */}
              <div className='farm-advice'>
                <span className='farm-advice-1'>!</span>
                <span className='farm-advice-2'> FARM ADVICE</span>
              </div>
              {/* Advice given based on inputs of temperature, humidity and rainfall generated in analyzeWeatherData method */}
              {/* Outputs relevant information needed by farmers */}
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


