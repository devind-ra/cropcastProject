import React from 'react';
import './WeatherApp.css'; // Make sure to create a CSS file with your styles

const WeatherApp = () => {
  return (
    <div className="weather-app">

        <header className="weather-header">
            <div className="search-bar">Search Bar</div>
            <div className="location">
                London
                <div className="weather-summary">
                    Mostly Clear
                    <span className="temperature">23°</span>
                </div>
            </div>
            <div className="high-low">
                H:23° L:15°
            </div>
            <div className="sunrise-sunset">
                <div>06:28</div>
                <div>17:58</div>
            </div>
        </header>

        <div className="farm-advice">
            <p>Farm Advice</p>
        </div>

        <div className="hourly-forecast">
            <div className="forecast-now">Now</div>
            <div className="forecast-hour">10PM</div>
            <div className="forecast-hour">11PM</div>
            <div className="forecast-hour">12AM</div>
            <div className="forecast-hour">1AM</div>
        </div>

        <div className="weather-details">
            <div className="rainfall">
            <div>13 mm in last 24h</div>
            <div>4 mm expected in next 24h.</div>
            </div>
            <div className="humidity">
            <div>78%</div>
            <div>The dew point is 10° right now.</div>
            </div>
        </div>

        <div className="top-info">
            <div className="wind-info">
                <h2>WIND</h2>
                <p>12 mph</p>
                <p>24 mph Gusts</p>
                <p>NW</p>
            </div>
            <div className="air-quality-info">
                <h2>AIR QUALITY</h2>
                <p>54</p>
                <p>Moderate</p>
            </div>
        </div>

        <div className="forecast">
            <h2>7-DAY FORECAST</h2>
            <div className="day">
                <p>Today</p>
                <img src="rain-icon.png" alt="Rain" />
                <p>15°</p>
                <p>23°</p>
            </div>
            <div className="day">
                <p>Mon</p>
                <img src="partly-cloudy-icon.png" alt="Partly Cloudy" />
                <p>18°</p>
                <p>27°</p>
            </div>
            <div className="last-14-days">
                <h2>LAST 14 DAYS</h2>
                <div className="day-history">
                    {/* Repeat for each day */}
                    <div className="day-record">
                        <p>21/02</p>
                        <img src="cloudy-icon.png" alt="Cloudy" />
                        <p>21°</p>
                        <p>10mm</p>
                        <p>13mph</p>
                    </div>
                </div>
                <div className="day-record">
                    <p>20/02</p>
                    <img src="sunny-icon.png" alt="Sunny" />
                    <p>21°</p>
                    <p>5mm</p>
                    <p>9mph</p>
                </div>
            </div>
        </div>

    <div className="severe-weather-warning">
        <p>Heavy thunderstorm expected at 16:00 on 22/02/2024</p>
    </div>
</div>
  );
};

export default WeatherApp;