import React, { useState } from "react";
import { fetchVideoGame } from "./api/api";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GameList from "./components/GameList";
import SearchBar from "./components/SearchBar";
import GameDetails from "./components/GameDetails";
import TrendingGames from "./components/TrendingGames";
import axios from "axios";
import { gameApiURL } from "./api/api";
import { TailSpin } from "react-loader-spinner";


import "./styles/app.scss";

const App = () => {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true); //Sets loading to true while the petition is being handled.

      // Search for the game using the search query
      const gameData = await fetchVideoGame(searchQuery);
      console.log("Game Data:", gameData);
      if (gameData) {
        // Search for the price using the game name
        const cheapSharkResponse = await axios.get(
          `${gameApiURL}/api/deals?title=${searchQuery}`
        );
        const deals = cheapSharkResponse.data;
        console.log("Deals:", deals);

        if (deals && Object.keys(deals).length > 0) {
          gameData.forEach((game) => {
            const matchedGame = Object.values(deals).find(
              (deal) => deal.external === game.name
            );
            console.log("Matched Game:", matchedGame);
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
        console.log("Updated Game Data:", gameData);
      }
      setLoading(false); //Sets loading to false when the petition is done.
    } catch (error) {
      setLoading(false);
      console.error("Error fetching video game data:", error);
    }
  };

  return (
    <Router>
      <div className="main-app__container">
        <h1>Video Game Deals</h1>
        <SearchBar handleSearch={handleSearch} />
        <Routes>
         <Route path="/" element={<GameList games={gameList} loading={loading} />} />
          {/* <Route path='/trending-deals' element={<TrendingGames />} /> */}
          <Route path="/game/:id" element={<GameDetails loading={loading} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
