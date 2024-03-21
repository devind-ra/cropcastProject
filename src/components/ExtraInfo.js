import React from "react";

const ExtraInfo = ({data, weatherData}) => {
    return (
        <div className='flex-row-mainweatherextra'>
            <div className='minmaxTemp'>
              <span className='temperature-high'>H: {Math.round(data.weatherData.main.temp_max)}°</span>
              <span className='temperature-low'>L: {Math.round(data.weatherData.main.temp_min)}°</span>
            </div>
            <span className='time-span'>{data.weatherData.sys.sunrise &&(
                        <p> 
                            {(() => {
                                let sunriseTimeStamp = data.weatherData.sys.sunrise;
                                let milliseconds = sunriseTimeStamp * 1000;
                                let dateObject = new Date(milliseconds);
                                let hours =  dateObject.getHours();
                                let minutes = dateObject.getMinutes(); 
                                let check = hours < 12 ? 'AM' : 'PM';
                                hours = hours % 12 || 12;
                                hours = String(hours).padStart(2, '0');
                                minutes = String(minutes).padStart(2, '0');
                                return ` ${hours}:${minutes} ${check}`;
                            })()}
                        </p>
                    )}</span>
              <span className='time-span-2'>{data.weatherData.sys.sunset &&(
                        <p>
                            {(() => {
                                let sunsetTimeStamp = data.weatherData.sys.sunset;
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
                    )}</span>
            </div>
    );
};

export default ExtraInfo; 

