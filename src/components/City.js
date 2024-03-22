import React from "react";
//Component used to represent the city name on the application underneath the search bar
const City = ({data, weatherData}) => { //Parses in data that is outputted after user input is taken in 
    return (
        <div className='flex-row-city'>
            {console.log("name", data.weatherData.name)}
            {console.log(data.forecast.city.name)}
            <span className='city'>{data.weatherData.name}</span>
        </div>
    )
}

export default City; 