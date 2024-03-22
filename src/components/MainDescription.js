import React from "react";
// Component used to add the small description of the weather for the city currently along with its temperature and relevant icon
const MainDescription = ({data, weatherData, capitalise, getWeatherIcon, changeBackground}) => {
    return (
        <div className='flex-row-maindescription'>
            {/* Contains all information in one flex row */}
            <span className='mainweather-description'>{capitalise(data.weatherData.weather[0].description)}</span>
            {/* Information is cleaned and outputted */}
            <div className='mainweather-icon' style={{
              backgroundImage: `url(${getWeatherIcon(weatherData.weather[0].icon)})`}}/> {/*Main image is this*/}
            <span className='mainweather-temp'>{Math.round(data.weatherData.main.temp)}°</span>
            {/* Changes the image based on data retrieved for city */}
            {changeBackground(weatherData.weather[0].icon)}
        </div>
    );
};

export default MainDescription; 