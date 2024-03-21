import React from "react";

const MainDescription = ({data, weatherData, capitalise, getWeatherIcon, changeBackground}) => {
    return (
        <div className='flex-row-maindescription'>
            <span className='mainweather-description'>{capitalise(data.weatherData.weather[0].description)}</span>
            <div className='mainweather-icon' style={{
              backgroundImage: `url(${getWeatherIcon(weatherData.weather[0].icon)})`}}/> {/*Main image is this*/}
            <span className='mainweather-temp'>{Math.round(data.weatherData.main.temp)}°</span>
            {changeBackground(weatherData.weather[0].icon)}
        </div>
    );
};

export default MainDescription; 