import React from 'react';
import { extremeWeather } from '../adviceandalerts';

const SevereAlert = ({data}) => {
    return (
      <div className='flex-row-severeweather'>
        <div className='header-severeweather'>
          <span className='severe-weather'>severe weather </span>
        </div>
        <span className='severe-alert'>
          {extremeWeather(data.weatherData.temp, data.weatherData.precipitation)}
        </span>
        <div className='rectangle-35' />
      </div>
    );
};

export default SevereAlert;