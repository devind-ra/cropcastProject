import React from "react";
import { getWeatherIcon,capitalise} from "../weatherdataConversions";
import { changeBackground } from "../changeBackground";
// Component used to show the short description of the weather for the city along with its associated temperature and icon
const MainDescription = ({data}) => {
    return (
        <div className='flex-row-maindescription'>
            {/* Ensures all data is in one place and can be formatted in the right way */}
            <span className='mainweather-description'>{capitalise(data.weatherData.weather[0].description)}</span>
            <div className='mainweather-icon' style={{
              backgroundImage: `url(${getWeatherIcon(data.weatherData.weather[0].icon)})`}}/> {/*Main image is this*/}
            <span className='mainweather-temp'>{Math.round(data.weatherData.main.temp)}°</span>
            {changeBackground(data.weatherData.weather[0].icon)}
        </div>
    );
};

export default MainDescription; 