import React from 'react';
import './index.css';

export default function App() {
  return (
    <div className='main-container'>
      {/* First page */}
      <div className='search' />
      <div className='flex-row-ae'>
        <div className='leaf' />
        <span className='london'>London</span>
      </div>
      <div className='flex-row-f'>
        <span className='mostly-clear'>Mostly Clear</span>
        <div className='group' />
        <span className='degree'>23°</span>
      </div>
      <div className='sunset' />
      <div className='flex-row-f-1'>
        <div className='regroup'>
          <span className='temperature-high'>H:23°</span>
          <span className='temperature-low'>L:15°</span>
        </div>
        <span className='time-span'>06:28</span>
        <span className='time-span-2'>17:58</span>
      </div>
      <div className='flex-row-ca'>
        <div className='rectangle' />
        <div className='farm-advice'>
          <span className='farm-advice-3'>! </span>
          <span className='farm-advice-4'> FARM ADVICE</span>
        </div>
        <div className='rain-advice'>
          <span className='rain-advice-5'>
            80% chance of rain with 20mm expected in the next 24 hours.
            <br />
          </span>
          <span className='mulch-advice'>
            Consider laying mulch around your crops as a protective measure. 🌱
          </span>
        </div>
      </div>
      <div className='flex-row-fa'>
        <div className='hourly-forecast'>Hourly forecast</div>
        <div className='line' />
        <div className='rectangle-6' />
        <span className='now'>Now</span>
        <div className='pm'>
          <span className='time-10'>10</span>
          <span className='pm-7'>PM</span>
        </div>
        <div className='pm-8'>
          <span className='time-11'>11</span>
          <span className='pm-9'>PM</span>
        </div>
        <div className='am'>
          <span className='time-12a'>12</span>
          <span className='m'>AM</span>
        </div>
        <div className='am-a'>
          <span className='time-1a'>1</span>
          <span className='m-b'>AM</span>
        </div>
        <div className='image' />
        <div className='image-c' />
        <div className='image-d' />
        <div className='image-e' />
        <div className='image-f' />
        <span className='temperature-21'>21°</span>
        <span className='temperature-21-10'>21°</span>
        <span className='temperature-19'>19°</span>
        <span className='temperature-19-11'>19°</span>
        <span className='temperature-19-12'>19°</span>
      </div>
      <div className='flex-row-c'>
        <div className='rectangle-13' />
        <div className='rectangle-14' />
        <div className='auto-layout-horizontal'>
          <div className='icon' />
          <span className='rainfall'>Rainfall</span>
        </div>
        <div className='auto-layout-horizontal-15'>
          <div className='empty' />
          <span className='humidity'>humidity</span>
        </div>
        <span className='empty-16'>13</span>
        <span className='mm'>mm</span>
        <span className='percentage'>78%</span>
        <span className='in-last-h'>in last 24h</span>
        <span className='mm-expected-in-next-h'>
          4 mm expected
          <br />
          in next 24h.
        </span>
        <span className='dew-point'>
          The dew point is
          <br />
          10° right now.
        </span>
      </div>
      {/* End of First page */}
      
      {/* Start of Second page */}
      
      <div className='flex-row-d'>
        <div className='rectanglez' />
        <div className='rectangle-1' />
        <div className='auto-layout-horizontal'>
          <div className='icon' />
          <span className='wind'>Wind</span>
        </div>
        <div className='auto-layout-horizontal-15'>
          <div className='auto-layout-horizontal-3'>
            <div className='icon-4' />
            <span className='air-quality'>Air quality</span>
          </div>
        </div>
        <span className='number-12'>12</span>
        <span className='number-24'>24</span>
        <div className='line' />
        <span className='percentage'>54</span>
        <span className='mph'>mph</span>
        <span className='mph-5'>mph</span>
        <span className='wind-6'>Wind</span>
        <span className='gusts'>Gusts</span>
        <span className='dew-point'>Moderate</span>
        <span className='nw'>NW</span>
      </div>
      <div className='flex-row-bec'>
        <div className='list' />
        <div className='auto-layout-horizontal-7'>
          <div className='pic-4' />
          <span className='day-forecast'>7-DAY FORECAST</span>
        </div>
        <span className='low'>Low</span>
        <span className='high'>High</span>
        <div className='list-8'>
          <div className='flex-row'>
            <span className='today'>Today</span>
            <span className='degreez'>23°</span>
            <div className='imagee' />
            <span className='degree-9'>15°</span>
          </div>
          <div className='line-a' />
        </div>
        <div className='union' />
        <div className='list-b'>
          <div className='frame' />
          <div className='flex-row-cc'>
            <div className='image-Ca' />
            <div className='groupp'>
              <div className='flex-row-cbd'>
                <span className='day-mon'>Mon</span>
                <span className='temperature--high'>27°</span>
                <span className='temperature--low'>18°</span>
                <div className='frame-d' />
              </div>
              <div className='line-e' />
            </div>
          </div>
        </div>
        <div className='list-f'>
          <div className='flex-row-b'>
            <div className='image-10' />
            <span className='day-tue'>Tue</span>
            <span className='temperature-high-11'>25°</span>
            <span className='temperature-low-12'>20°</span>
          </div>
          <div className='line-13' />
        </div>
        <div className='list-14'>
          <div className='frame-15' />
          <div className='flex-row-b-16'>
            <span className='day-wed'>Wed</span>
            <span className='temperature-high-17'>25°</span>
            <div className='sunny-color' />
            <span className='temperature-low-18'>17°</span>
            <div className='frame-19' />
          </div>
          <div className='line-1a' />
        </div>
        <div className='list-1b'>
          <div className='frame-1c' />
          <div className='flex-row-d-1d'>
            <span className='span-thu'>Thu</span>
            <span className='span-25'>25°</span>
            <div className='image-1e' />
            <span className='span-17'>17°</span>
            <div className='frame-1f' />
          </div>
          <div className='line-20' />
        </div>
        <div className='list-21'>
          <div className='flex-row-22'>
            <span className='span-fri'>Fri</span>
            <span className='span-26'>26°</span>
            <div className='image-23' />
            <span className='span-20'>20°</span>
            <div className='frame-24' />
          </div>
          <div className='line-25' />
        </div>
        <div className='list-26'>
          <div className='flex-row-27'>
            <span className='span-sat'>Sat</span>
            <span className='span-25-28'>25°</span>
            <div className='image-29' />
            <span className='degree-2a'>18°</span>
          </div>
          <div className='line-2b' />
        </div>
        <div className='list-2c'>
          <div className='frame-2d' />
          <div className='flex-row-b-2e'>
            <span className='sun'>Sun</span>
            <span className='degree-2f'>21°</span>
            <div className='image-30' />
            <span className='degree-31'>13°</span>
            <div className='frame-32' />
          </div>
          <div className='line-33' />
        </div>
      </div>
      <div className='flex-row-c-a'>
        <div className='auto-layout-horizontal-34'>
          <span className='severe-weather'>severe weather </span>
        </div>
        <span className='heavy-thunderstorm'>
          Heavy thunderstorm expected
          at 16:00 on <br />22/02/2024
        </span>
        <div className='rectangle-35' />
      </div>
      {/* End of second page */}

    </div>
  );
  
}