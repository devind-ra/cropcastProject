import React from "react";
import { getWeatherIcon,capitalise} from "../weatherdataConversions";

const MainDescription = ({data, changeBackground}) => {
    return (
        <div className='flex-row-maindescription'>
            <span className='mainweather-description'>{capitalise(data.weatherData.weather[0].description)}</span>
            <div className='mainweather-icon' style={{
              backgroundImage: `url(${getWeatherIcon(data.weatherData.weather[0].icon)})`}}/> {/*Main image is this*/}
            <span className='mainweather-temp'>{Math.round(data.weatherData.main.temp)}°</span>
            {changeBackground(data.weatherData.weather[0].icon)}
        </div>
    );
};

export default MainDescription; 