import React from 'react';
import SearchBar from './SearchBar';

import '../styles/navBar.scss';

const Navbar = ({handleSearch}) => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <button className="navbar__button">Home</button>
        <button className="navbar__button">Trending Games</button>
        <button className="navbar__button">My Game List</button>
      </div>
      <SearchBar handleSearch={handleSearch}/>
      <div className="navbar__right">
        <button className="navbar__button">Sign In / Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
