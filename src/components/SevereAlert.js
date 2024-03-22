import React from 'react';
import { extremeWeather } from '../adviceandalerts';
// Component used to represent the alerts based on temperature and precipitation 
const SevereAlert = ({data}) => {
    return (
      <div className='flex-row-severeweather'>
        {/* Ensures all information is in the box as provided */}
        <div className='header-severeweather'>
          <span className='severe-weather'>severe weather </span>
        </div>
        <span className='severe-alert'>
          {/* Passed into method which then checks both pieces of data against information */}
          {extremeWeather(data.weatherData.temp, data.weatherData.precipitation)}
        </span>
        <div className='rectangle-35' />
      </div>
    );
};

export default SevereAlert;