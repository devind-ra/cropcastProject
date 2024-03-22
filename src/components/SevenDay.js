import React from "react";
import { kelvinToCelsius, epochToDay, getWeatherIcon } from '../weatherdataConversions';

// Component used to represent the information needed for the 7 day forecast box of the application 
const SevenDay = ({data}) => {
    return (
        <div className='flex-row-7day'>
            {/* Stores all the information in one flex row */}
            <div className='header-7day'>
            <div className='icon-forecast' />
            {/* Header for the box */}
            <span className='day-forecast'>7-DAY FORECAST</span>
            </div>
            {/* Two sub headings for the information provided */}
            <span className='low'>Low</span>
            <span className='high'>High</span>
            
            {/* Current day's forecast with associated icon and temperatures */}
            <div className='day-0'>
            <div className='flex-row-0'>
                <span className='today'>Today</span>
                <span className='temp-high-0'>{kelvinToCelsius(data.dayForecast.list[0].temp.max)}°</span>
                <div className='imagee' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[0].weather[0].icon)})`}}/>
                <span className='temp-low-0'>{kelvinToCelsius(data.dayForecast.list[0].temp.min )}°</span>
            </div>
            </div>
            
            {/* <div className='union' /> */}
            {/* First day after today's forecast with associated icon and temperatures */}
            <div className='day-1'>
            <div className='frame' />
            <div className='flex-row-1'>
            <div className='image-Ca' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[1].weather[0].icon)})`}}/>
                <div className='groupp'>
                <div className='flex-row-cbd'>
                    <span className='day-mon'>{epochToDay(data.dayForecast.list[1].dt)}</span>
                    <span className='temp-high-1'>{kelvinToCelsius(data.dayForecast.list[1].temp.max)}°</span>
                    <span className='temp-low-1'>{kelvinToCelsius(data.dayForecast.list[1].temp.min)}°</span>
                    <div className='frame-d' />
                </div>
                </div>
            </div>
            </div>
            {/* Second day after today's forecast with associated icon and temperatures */}
            <div className='day-2'>
            <div className='flex-row-2'>
                <div className='image-10' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[2].weather[0].icon)})`}}/>
                <span className='day-tue'>{epochToDay(data.dayForecast.list[2].dt)}</span>
                <span className='temp-high-2'>{kelvinToCelsius(data.dayForecast.list[2].temp.max)}°</span>
                <span className='temp-low-2'>{kelvinToCelsius(data.dayForecast.list[2].temp.min)}°</span>
            </div>
            </div>
            {/* Third day after today's forecast with associated icon and temperatures */}
            <div className='day-3'>
            <div className='frame-15' />
            <div className='flex-row-3'>
                <span className='day-wed'>{epochToDay(data.dayForecast.list[3].dt)}</span>
                <span className='temp-high-3'>{kelvinToCelsius(data.dayForecast.list[3].temp.max)}°</span>
                <div className='sunny-color' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[3].weather[0].icon)})`}}/>
                <span className='temp-low-3'>{kelvinToCelsius(data.dayForecast.list[3].temp.min)}°</span>
                <div className='frame-19' />
            </div>
            </div>
            {/* Fourth day after today's forecast with associated icon and temperatures */}
            <div className='day-4'>
            <div className='frame-1c' />
            <div className='flex-row-4'>
                <span className='span-thu'>{epochToDay(data.dayForecast.list[4].dt)}</span>
                <span className='temp-high-4'>{kelvinToCelsius(data.dayForecast.list[4].temp.max)}°</span>
                <div className='image-1e' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[4].weather[0].icon)})`}}/>
                <span className='temp-low-4'>{kelvinToCelsius(data.dayForecast.list[4].temp.min)}°</span>
                <div className='frame-1f' />
            </div>
            </div>
            {/* Fifth day after today's forecast with associated icon and temperatures */}
            <div className='day-5'>
            <div className='flex-row-5'>
                <span className='span-fri'>{epochToDay(data.dayForecast.list[5].dt)}</span>
                <span className='temp-high-5'>{kelvinToCelsius(data.dayForecast.list[5].temp.max)}°</span>
                <div className='image-23' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[5].weather[0].icon)})`}}/>
                <span className='temp-low-5'>{kelvinToCelsius(data.dayForecast.list[5].temp.min)}°</span>
                <div className='frame-24' />
            </div>
            </div>
            {/* Sixth day after today's forecast with associated icon and temperatures */}
            <div className='day-6'>
            <div className='flex-row-6'>
                <span className='span-sat'>{epochToDay(data.dayForecast.list[6].dt)}</span>
                <span className='temp-high-6'>{kelvinToCelsius(data.dayForecast.list[6].temp.max)}°</span>
                <div className='image-29' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[6].weather[0].icon)})`}}/>
                <span className='temp-low-6'>{kelvinToCelsius(data.dayForecast.list[6].temp.min)}°</span>
            </div>
            {/* <div className='line-6' /> */}
            </div>
            {/* Seventh day after today's forecast with associated icon and temperatures */}
            <div className='day-7'>
            <div className='frame-2d' />
            <div className='flex-row-7'>
                <span className='sun'>{epochToDay(data.dayForecast.list[7].dt)}</span>
                <span className='temp-high-7'>{kelvinToCelsius(data.dayForecast.list[7].temp.max)}°</span>
                <div className='image-30' style={{backgroundImage: `url(${getWeatherIcon(data.forecast.list[7].weather[0].icon)})`}}/>
                <span className='temp-low-7'>{kelvinToCelsius(data.dayForecast.list[7].temp.min)}°</span>
                <div className='frame-32' />
            </div>
            {/* <div className='line-7' /> */}
            </div>
        </div>
    )
}

export default SevenDay; 

