import React from 'react';
import { kelvinToCelsius, mpstomph } from '../weatherdataConversions';
import { calcAvgData, getTemps, getRains, getWinds, convertToDate } from '../historicaldataFunctions';
const Historical = ({data}) => {
    return (
        
        <div className='flex-row-historical'>
          <div className='historical-data'>LAST FIVE DAYS</div>
            <div className='historical-data-box' />
            <div className='pm-6-text'>
              <span className='time-6'>{convertToDate(data.historical[Object.keys(data.historical)[0]][0].dt)}</span>
            </div>
            <div className='pm-7-text'>
              <span className='time-7'>{convertToDate(data.historical[Object.keys(data.historical)[1]][0].dt)}</span>
            </div>
            <div className='pm-8-text'>
              <span className='time-8'>{convertToDate(data.historical[Object.keys(data.historical)[2]][0].dt)}</span>
            </div>
            <div className='pm-9-text'>
              <span className='time-9'>{convertToDate(data.historical[Object.keys(data.historical)[3]][0].dt)}</span>
            </div>
            <div className='pm-10-text'>
              <span className='time-10'>{convertToDate(data.historical[Object.keys(data.historical)[4]][0].dt)}</span>
            </div>

            <span className='pm-6-temp'>{kelvinToCelsius(calcAvgData(getTemps(data.historical, 0)))}°</span>
            <span className='pm-7-temp'>{kelvinToCelsius(calcAvgData(getTemps(data.historical, 1)))}°</span>
            <span className='pm-8-temp'>{kelvinToCelsius(calcAvgData(getTemps(data.historical, 2)))}°</span>
            <span className='pm-9-temp'>{kelvinToCelsius(calcAvgData(getTemps(data.historical, 3)))}°</span>
            <span className='pm-10-temp'>{kelvinToCelsius(calcAvgData(getTemps(data.historical, 4)))}°</span>
      
            <span className='pm-6-rain'>{calcAvgData(getRains(data.historical, 0))}mm</span>
            <span className='pm-7-rain'>{calcAvgData(getRains(data.historical, 1))}mm</span>
            <span className='pm-8-rain'>{calcAvgData(getRains(data.historical, 2))}mm</span>
            <span className='pm-9-rain'>{calcAvgData(getRains(data.historical, 3))}mm</span>
            <span className='pm-10-rain'>{calcAvgData(getRains(data.historical, 4))}mm</span>
            
            <span className='pm-6-wind'>{mpstomph(calcAvgData(getWinds(data.historical, 0)))}mph</span>
            <span className='pm-7-wind'>{mpstomph(calcAvgData(getWinds(data.historical, 1)))}mph</span>
            <span className='pm-8-wind'>{mpstomph(calcAvgData(getWinds(data.historical, 2)))}mph</span>
            <span className='pm-9-wind'>{mpstomph(calcAvgData(getWinds(data.historical, 3)))}mph</span>
            <span className='pm-10-wind'>{mpstomph(calcAvgData(getWinds(data.historical, 4)))}mph</span>
        </div>
    )
}

export default Historical; 

