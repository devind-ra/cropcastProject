import React from 'react';
import { mpstomph } from '../weatherdataConversions';
//Component produced to assist with wind and air quality information 
const Air = ({data}) => {
  
    var convert = {
        toCompass: function(degrees)//Function used to equate wind degrees to a direction for output 
        {
            return ['North', 'North-NorthEast', 'NorthEast', 'East-NorthEast', 'East', 'East-SouthEast', 'SouthEast', 'South-SouthEast', 'South', 'South-SouthWest', 'SouthWest', 'West-SouthWest', 'West', 'West-NorthWest', 'NorthWest', 'North-NorthWest', 'North'][Math.round(degrees / 11.25 / 2)];
        }
      }
    
    return (
    <div className='flex-row-windairquality'>
      {/* Flex row outputting information related to wind and air quality information */}
        <div className='rectangle-wind' />
        {/* Title for wind information */}
          <div className='header-left'>
            <div className='icon-wind' />
            <span className='wind'>Wind</span>
          </div>
          {/* Information relating to wind output */}
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
        {/* Title for air quality */}
          <div className='header-right'>
              <div className='icon-airquality' />
              <span className='air-quality'>Air quality</span>
          </div>
          {/* Information relating to air quality output */}
          <span className='percentage'>AQI: {data.pollution.list[0].main.aqi}</span>
          <span className='visibility'>Pressure: <br></br> {data.weatherData.main.pressure} hPa </span>

    </div>
    )
}

export default Air; 

