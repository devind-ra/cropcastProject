import React from "react";
// Component represents the name of the city to be displayed at the top of the application 
const City = ({data}) => {
    return (
        <div className='flex-row-city'>
            {console.log("name", data.weatherData.name)}
            {console.log(data.forecast.city.name)}
            <span className='city'>{data.weatherData.name}</span>
        </div>
    )
}

export default City; 