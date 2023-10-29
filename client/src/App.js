import React, { useState, useEffect } from "react";
import { fetchVideoGame } from "./api/api";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./components/Navbar";
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
  const [backgroundImage, setBackgroundImage] = useState("");

  const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;


  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true); 
      setSearchQuery(searchQuery); 

      const gameData = await fetchVideoGame(searchQuery);
      if (gameData) {
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching video game data:", error);
    }
  };

  console.log(gameList, "gameList")

  useEffect(() => {
    if (gameList.length > 0) {
      const randomIndex = Math.floor(Math.random() * gameList.length);
      const randomGame = gameList[randomIndex];
      const randomScreenshotIndex = Math.floor(
        Math.random() * randomGame.short_screenshots.length
      );
      const randomScreenshot = randomGame.short_screenshots[randomScreenshotIndex];

      setBackgroundImage(
         `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), #202634),  linear-gradient(to left, rgba(0, 0, 0, 0.5), transparent),
  linear-gradient(to right, rgba(0, 0, 0, 0.5), transparent), url(${randomScreenshot.image})`
        );
    }
  }, [gameList]);



  return (
    <Router>
      <AppContainer
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
      <Navbar handleSearch={handleSearch}/>
      <div className="main-app__container">
        <Routes>
         <Route path="/" element={<GameList loading={loading} gameList={gameList} setGameList={setGameList} handleSearch={handleSearch} searchQuery={searchQuery} />} />
          {/* <Route path='/trending-deals' element={<TrendingGames />} /> */}
          <Route path="/game/:id" element={<GameDetails loading={loading} setBackgroundImage={setBackgroundImage} />} />
        </Routes>
      </div>
      <div id="wip-footer">
      <span>This app is still a WIP. Created by: <a href="https://tyrwindev.github.io/digital-resume-v2.github.io/" target="_blank" rel="noreferrer">@tyrwindev</a></span>
      </div>
      </AppContainer>

    </Router>
  );
};

export default App;
