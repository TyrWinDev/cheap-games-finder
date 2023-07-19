import React, { useState } from 'react';
import { fetchVideoGame } from './api/api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GameList from './components/GameList';
import SearchBar from './components/SearchBar';
import GameDetails from './components/GameDetails';
import TrendingGames from './components/TrendingGames';
import axios from 'axios';
import { gameApiURL } from './api/api';

import './styles/app.css'

const App = () => {
  const [gameList, setGameList] = useState([]);

  const handleSearch = async (searchQuery) => {
    try {
      const gameData = await fetchVideoGame(searchQuery);
      console.log('Game Data:', gameData);
      if (gameData) {
        // Search for the price using the game name
        const cheapSharkResponse = await axios.get(`${gameApiURL}/api/deals?title=${searchQuery}`);
        const deals = cheapSharkResponse.data;
        console.log('Deals:', deals);
  
        if (deals && Object.keys(deals).length > 0) {
          gameData.forEach((game) => {
            const matchedGame = Object.values(deals).find((deal) => deal.external === game.name);
            console.log('Matched Game:', matchedGame);
            if (matchedGame) {
              game.cheapest = matchedGame.cheapest;
              game.cheapestDealID = matchedGame.cheapestDealID;
            }
          });
        }
  
        if (gameData.length > 0) {
          for (let i = 0; i < gameData.length; i++) {
            const game = gameData[i];
            const gameDescription = await axios.get(`${gameApiURL}/api/games/${game.id}`);
            const description = gameDescription.data.description_raw !== "" ? gameDescription.data.description_raw : gameDescription.data.description;
            game.description = description;
          }
        }
  
        setGameList(gameData);
        console.log('Updated Game Data:', gameData);
      }
    } catch (error) {
      console.error('Error fetching video game data:', error);
    }
  };

  return (
    <Router>
      <div className='main-app__container'>
        <h1>Video Game Deals</h1>
        <SearchBar handleSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<GameList games={gameList}/>} />
          <Route path='/trending-deals' element={<TrendingGames />} />
          <Route path="/game/:id" element={<GameDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
