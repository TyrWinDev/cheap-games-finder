import React, { useState } from "react";
import { fetchVideoGame } from "./api/api";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";
import TrendingGames from "./components/TrendingGames";
import axios from "axios";
import { gameApiURL } from "./api/api";


import "./styles/app.scss";
import Navbar from "./components/Navbar";

const App = () => {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true); //Sets loading to true while the petition is being handled.

      // Search for the game using the search query
      const gameData = await fetchVideoGame(searchQuery);
      if (gameData) {
        // Search for the price using the game name
        const cheapSharkResponse = await axios.get(
          `${gameApiURL}/api/deals?title=${searchQuery}`
        );
        const deals = cheapSharkResponse.data;


        if (deals && Object.keys(deals).length > 0) {
          gameData.forEach((game) => {
            const gameTitle = game.slug.toUpperCase().replace(/-/g, '');
            const matchedGame = Object.values(deals).find(
              (deal) => deal.internalName.includes(gameTitle)
            );
            
            if (matchedGame) {
              game.cheapest = matchedGame.cheapest;
              game.cheapestDealID = matchedGame.cheapestDealID;
            }
          });
        }

        if (gameData.length > 0) {
          for (let i = 0; i < gameData.length; i++) {
            const game = gameData[i];
            const gameDescription = await axios.get(
              `${gameApiURL}/api/games/${game.id}`
            );
            const description =
              gameDescription.data.description_raw !== ""
                ? gameDescription.data.description_raw
                : gameDescription.data.description;
            game.description = description;
          }
        }

        setGameList(gameData);
      }
      setLoading(false); //Sets loading to false when the petition is done.
    } catch (error) {
      setLoading(false);
      console.error("Error fetching video game data:", error);
    }
  };

  return (
    <Router>
      <div>
      <Navbar handleSearch={handleSearch}/>
      <div className="main-app__container">
        <h1 className="page-title">Video Game Deals</h1>
        <span className="page-subtitle">(Never pay full price again...)</span>
        <Routes>
         <Route path="/" element={<GameList games={gameList} loading={loading} />} />
          {/* <Route path='/trending-deals' element={<TrendingGames />} /> */}
          <Route path="/game/:id" element={<GameDetails loading={loading} />} />
        </Routes>
      </div>
      </div>

    </Router>
  );
};

export default App;
