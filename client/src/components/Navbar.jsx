import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import styled from 'styled-components';


const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #283044;
  color: #fff;
  padding: 1rem;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #6dc849;
      font-weight: 600;
    }
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const MobileNavToggle = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
      color: #6dc849;
      font-weight: 600;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopNav = styled.ul`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;

  @media (max-width: 767px) {
    display: flex;
  }
`;

const Navbar = ({handleSearch}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
        <Nav>
        <Logo>Game Deals</Logo>
        <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
        {isMobileNavOpen ? 'Close' : 'Menu'}
      </MobileNavToggle>
        <DesktopNav>
          <NavItem><Link to="/">Home</Link></NavItem>
          <NavItem><Link to="/">Trending Games (WIP)</Link></NavItem>
          <NavItem><Link to="/">My Game List (WIP)</Link></NavItem>
          {/* <NavItem><SearchBar handleSearch={handleSearch}/></NavItem> */}
          <NavItem><Link to="/">Sign In / Login (WIP)</Link></NavItem>
        </DesktopNav>
        <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
          <NavItem><Link to="/">Home</Link></NavItem>
          <NavItem><Link to="/">Trending Games</Link></NavItem>
          <NavItem><Link to="/">My Game List</Link></NavItem>
          {/* <NavItem><SearchBar handleSearch={handleSearch}/></NavItem> */}
          <NavItem><Link to="/">Sign In / Login</Link></NavItem>
        </MobileNav>
      </Nav>
  );
};

export default Navbar;
