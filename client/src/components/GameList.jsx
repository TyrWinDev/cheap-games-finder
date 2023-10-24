import React from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { AiOutlineClockCircle, AiFillStar } from "react-icons/ai";
import { getRating, filteredGames } from "../utils/utils.js";

import "../styles/gameList.scss";
import "../styles/app.scss";

const GameList = ({ games, loading }) => {

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <div className="game-list__container">
          {filteredGames.map((game) => {
            const { metacritic } = game;
            const { rating, ratingClass } = getRating(metacritic);

            return (
              <div className="game-list__game-container" key={game.id}>
                <div className="game-list__image-container">
                  <Link to={`/game/${game.id}`} target="_blank">
                    <img
                      className="game-list__image"
                      src={game.background_image}
                      alt={game.name}
                    />
                  </Link>
                </div>

                <div className="game-list__main-container">
                  <div className="game-list__title-container">
                    <Link to={`/game/${game.id}`}>
                      {" "}
                      <h3 id="game-list__title">{game.name}</h3>
                    </Link>

                    <div className={`game-list__rating-container`}>
                      <span className={`game-list__rating ${ratingClass}`}>
                        {!game.metacritic ? "N/A" : game.metacritic}
                      </span>
                    </div>
                  </div>
                  <div className="game-list__platforms">
                    {game.platforms.map((platform) => (
                      <span
                        className="game-list__platform"
                        key={platform.platform.id}
                      >
                        <i>{platform.platform.name}</i>
                      </span>
                    ))}
                  </div>
                  <div className="game-list__released-&-genres">
                    <div className="game-list__released">
                      <span id="game-list__released">
                        Release date: {game.released}
                      </span>
                    </div>
                    <div className="game-list__genres">
                      {game.genres.map((genre) => (
                        <span id="game-list__genre" key={genre.id}>
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* <div className="game-list__playtime-rating">
                    <span id="game-list__released">
                      Release date: {game.released}
                    </span>
                    {game.playtime !== 0 && (
                      <h4 id="game-list__playtime">
                        <AiOutlineClockCircle />{" "}
                        {`Average Playtime: ${game.playtime} hours`}
                      </h4>
                    )}
                  </div> */}
                  <div className="game-list__description">
                    <p>
                      {game.description.length > 120
                        ? game.description.slice(0, 120) + "..."
                        : game.description}
                      {/* <Link to={`/game/${game.id}`}>... learn More</Link> */}
                    </p>
                  </div>
                </div>

                <div className="game-list__actions-container">
                  <div className="game-list__button-container">
                    <button
                      className="game-list__button"
                      disabled={!game.cheapest}
                    >
                      <Link to={`/game/${game.id}`} target="_blank">
                        <h3>
                          {!game.cheapest
                            ? "No offers available..."
                            : `Get this game for $${game.cheapest}`}
                        </h3>
                        {/* <span id="game-list__price">{`Cheapest Price: ${
                          !game.cheapest ? "N/A" : `$${game.cheapest}`
                        }`}</span> */}
                      </Link>
                    </button>
                  </div>
                  {/* <div className="game-list__button-container">
                    <button className="game-list__button">
                    <AiFillStar /> Add to Wishlist
                    </button>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GameList;
