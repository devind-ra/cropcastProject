import React from "react";
import { getWeatherIcon } from "../weatherdataConversions";
import { convertEpochTimeToReadable, kelvinToCelsius } from "../weatherdataConversions";
// Component used to represent the hourly forecast from the current hour to 4 hours ahead 
const HourlyForecast = ({data}) => {
    return (
        <div className='flex-row-hourly'>
          {/* Flex row used to show information correctly in the box */}
            <div className='hourly-forecast'>HOURLY FORECAST</div>
            <div className='rectangle-6' />
            {/* Current time */}
            <span className='now'>Now</span>
            <div className='time-1'>
              {/* One hour from the current time */}
              <span className='time-1-1'>{convertEpochTimeToReadable(data.forecast.list[0].dt).hour}</span>
              <span className='time-1-2'>{convertEpochTimeToReadable(data.forecast.list[0].dt).period}</span>
            </div>
            <div className='time-2'>
              {/* Two hours from the current time */}
              <span className='time-2-1'>{convertEpochTimeToReadable(data.forecast.list[1].dt).hour}</span>
              <span className='time-2-2'>{convertEpochTimeToReadable(data.forecast.list[1].dt).period}</span>
            </div>
            <div className='time-3'>
              {/* Three hours from the current time */}
              <span className='time-3-1'>{convertEpochTimeToReadable(data.forecast.list[2].dt).hour}</span>
              <span className='time-3-2'>{convertEpochTimeToReadable(data.forecast.list[2].dt).period}</span>
            </div>
            <div className='time-4'>
              {/* Four hours from the current temperature */}
              <span className='time-4-1'>{convertEpochTimeToReadable(data.forecast.list[3].dt).hour}</span>
              <span className='time-4-2'>{convertEpochTimeToReadable(data.forecast.list[3].dt).period}</span>
            </div>
            {/* All icons associated with the current weathers for the hourly forecast*/}
            <div className='image-0' style={{backgroundImage: `url(${getWeatherIcon(data.weatherData.weather[0].icon)})`}}/>
            <div className='image-1' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[1].weather[0].icon)})`}}/>
            <div className='image-2' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[2].weather[0].icon)})`}}/>
            <div className='image-3' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[3].weather[0].icon)})`}}/>
            <div className='image-4' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[4].weather[0].icon)})`}}/>
            {/* Temperatures related to each of the 5 hours displayed on the application using the API data */}
            <span className='temperature-0'>{Math.round(data.weatherData.main.temp)}°</span>
            <span className='temperature-1'>{kelvinToCelsius(data.forecast.list[0].main.temp)}°</span>
            <span className='temperature-2'>{kelvinToCelsius(data.forecast.list[1].main.temp)}°</span>
            <span className='temperature-3'>{kelvinToCelsius(data.forecast.list[2].main.temp)}°</span>
            <span className='temperature-4'>{kelvinToCelsius(data.forecast.list[3].main.temp)}°</span>
          </div>
        
    );
};

export default HourlyForecast; 
