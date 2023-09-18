import React, { useState } from 'react';

import '../styles/searchBar.scss';

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className='search-bar__container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder='Search for a game...'
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
