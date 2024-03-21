import React from "react";

const City = ({data, weatherData}) => {
    return (
        <div className='flex-row-city'>
            {console.log("name", data.weatherData.name)}
            {console.log(data.forecast.city.name)}
            <span className='city'>{data.weatherData.name}</span>
        </div>
    )
}

export default City; 