import React from "react";

const SearchBar = ({handleSubmit, handleInputChange, city, initialSearch}) => {
    return (
        <form onSubmit={handleSubmit} className={`searchbar ${initialSearch ? 'functional-screen': 'initial-screen'}`}>
            <input
            type="text"
            placeholder="Enter city name"
           value={city}
            onChange={handleInputChange}
            />
          <span className='search-icon'></span>
          <button type="submit" className="searchbutton">Get Weather</button>
      </form>
    );
};

export default SearchBar;