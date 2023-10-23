import React, { useState } from "react";
import { fetchVideoGame } from "./api/api";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";
import TrendingGames from "./components/TrendingGames";
import axios from "axios";
import { gameApiURL } from "./api/api";


import "./styles/app.scss";

const App = () => {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true); //Sets loading to true while the petition is being handled.
      setSearchQuery(searchQuery); //Sets the search query to the one that was passed as an argument.

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

  console.log(gameList, "gameList")

  return (
    <Router>
      <div>
      {/* <Navbar handleSearch={handleSearch}/> */}
      <div className="main-app__container">
        <h1 className="page-title">{gameList.length > 0 ? `Showing game results for: ${searchQuery}` : `Video Game Deals`}</h1>

        {/* {gameList.length === 0 && !loading && (
          <>
          <span className="page-subtitle">(Never pay full price again...)</span>

            <SearchBar handleSearch={handleSearch}/>
          </>
        )}

        {gameList.length > 0 && (
           <button className="main-app__clear-btn" onClick={() => setGameList([])}> Clear Results </button>
        )} */}
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
