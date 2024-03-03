
import './App.css';
import React from 'react';
import Weather from './Weather';

function App() {
  return (
    <div className="App">
      <div className='container'>
          <div className="search">
            <Weather />
          </div>
          <div className="currentInfo">

          </div>
      </div>
    </div>
    
  );
}

export default App;
