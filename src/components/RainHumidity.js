import React from "react";

const RainHumidity = ({data}) => {
    return (
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
    );
};

export default RainHumidity; 

