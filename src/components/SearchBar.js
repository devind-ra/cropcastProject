import React from "react";
// Component representing the search bar used for both the functional and initial screen
const SearchBar = ({handleSubmit, handleInputChange, city, initialSearch, fetchData}) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); fetchData(); }} className={`searchbar ${initialSearch ? 'functional-screen': 'initial-screen'}`}>
            {/* Form used to allow for easy retrieval of data from API */}
            <input
            type="text"
            placeholder="Enter city name"
           value={city}
            onChange={handleInputChange}
            />
        {/* Icon that allows for quick use of search bar */}
          <span className='search-icon'></span>
          <button type="submit" className="searchbutton">Get Weather</button>
      </form>
    );
};

export default SearchBar;