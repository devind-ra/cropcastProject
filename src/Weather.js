import React, {useEffect, useState} from "react";
import axios from 'axios'; 

const Weather = () => {
    const[city, setCity] = useState("");
    const[weatherData, setWeatherData] = useState(null);
    const fetchData = async () =>{
        try{
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b232c27ecc0088cdf71e7dd1310d7fab` // eslint-disable-line no-template-curly-in-string
            );
            setWeatherData(response.data)
            console.log(response.data);
        }catch(error){
            console.error(error)
        }
    };
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleInputChange = (e) =>{
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(); 
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={handleInputChange}
            />
            <button type="submit">Get Weather</button>
            </form>
            
            {weatherData ? (
                
                <>
                    <h2>{weatherData.name}</h2>
                    <p> Temperature: {weatherData.main.temp} °C</p>
                    <p> Description: {weatherData.weather[0].description}</p>
                    <p> Hi: {weatherData.main.temp_max} °C</p>
                    <p> Lo: {weatherData.main.temp_min} °C</p>
                    <p> Humidity: {weatherData.main.humidity} %</p>
                    <p> Wind Speed: {weatherData.wind.speed} m/s</p>
                    <p> Wind Direction: {weatherData.wind.deg} °</p>
                    <p> Pressure: {weatherData.main.pressure} hPa</p>
                    <p> Feels Like: {weatherData.main.feels_like} °C</p>
                    <p> Visibility: {weatherData.visibility} m</p>
                    <p> Cloudiness: {weatherData.clouds.all} %</p>                    
                    
                    {weatherData.sys.sunrise &&(
                        <p> Sunrise: 
                            {(() => {
                                let sunriseTimeStamp = weatherData.sys.sunrise;
                                let milliseconds = sunriseTimeStamp * 1000;
                                let dateObject = new Date(milliseconds);
                                let hours =  dateObject.getHours();
                                let minutes = dateObject.getMinutes(); 
                                let check = hours < 12 ? 'AM' : 'PM';
                                hours = hours % 12 || 12;
                                return ` ${hours}:${minutes} ${check}`;
                            })()}
                        </p>
                    )}

                    {weatherData.sys.sunset &&(
                        <p> Sunset: 
                            {(() => {
                                let sunsetTimeStamp = weatherData.sys.sunset;
                                let milliseconds = sunsetTimeStamp * 1000;
                                let dateObject = new Date(milliseconds);
                                let hours =  dateObject.getHours();
                                let minutes = dateObject.getMinutes(); 
                                hours = String(hours).padStart(2, '0');
                                minutes = String(minutes).padStart(2, '0');
                                let check = hours < 12 ? 'AM' : 'PM';
                                return ` ${hours}:${minutes} ${check}`;
                            })()}
                        </p>
                    )}
                </>
            ):(
                <p>Loading Weather data...</p>
            )}
        </div>
    );
};
export default Weather; 