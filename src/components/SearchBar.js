import React from "react";
// Component representing the search bar used for both the initial screen and functional screen 
const SearchBar = ({handleSubmit, handleInputChange, city, initialSearch, fetchData}) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); fetchData(); }} className={`searchbar ${initialSearch ? 'functional-screen': 'initial-screen'}`}>
            {/* Allows for input from user and then API call is processed using city inputted */}
            <input
            type="text"
            placeholder="Enter city name"
           value={city}
            onChange={handleInputChange}
            />
        {/* Icon used for the search bar when collapsed */}
          <span className='search-icon'></span>
        {/* Button used for submission if enter key is not pressed */}
          <button type="submit" className="searchbutton">Get Weather</button>
      </form>
    );
};

export default SearchBar;