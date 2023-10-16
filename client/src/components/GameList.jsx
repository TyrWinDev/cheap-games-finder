import React from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { AiOutlineClockCircle, AiFillStar } from "react-icons/ai";

import "../styles/gameList.scss";
import "../styles/app.scss";

const GameList = ({ games, loading }) => {
  // Filter games with cheapest price
  const filteredGames = games
    .filter(
      (game) =>
        (game.cheapest && game.metacritic) || !game.cheapest || !game.metacritic
    )
    .sort((a, b) => {
      const ratingA = a.metacritic;
      const ratingB = b.metacritic;

      // Check if both games have a price, if not, prioritize the one with a price.
      if (!a.cheapest && b.cheapest) {
        return 1;
      } else if (a.cheapest && !b.cheapest) {
        return -1;
      }

      // If both have a price or neither have a price, sort by metacritic rating.
      return ratingB - ratingA;
    });

  // Get rating based on metacritic score
  const getRating = (metacritic) => {
    let rating;
    let ratingClass;

    switch (true) {
      case metacritic >= 1 && metacritic <= 10:
        rating = "Gutter Trash";
        ratingClass = "gutter-trash";
        break;
      case metacritic > 10 && metacritic <= 20:
        rating = "Terrible";
        ratingClass = "terrible";
        break;
      case metacritic > 20 && metacritic <= 30:
        rating = "Utterly Bad";
        ratingClass = "utterly-bad";
        break;
      case metacritic > 30 && metacritic <= 40:
        rating = "Quite Disappointing";
        ratingClass = "quite-disappointing";
        break;
      case metacritic > 40 && metacritic <= 50:
        rating = "Below Average Decency";
        ratingClass = "below-average";
        break;
      case metacritic > 50 && metacritic <= 60:
        rating = "Average at Best";
        ratingClass = "average";
        break;
      case metacritic > 60 && metacritic <= 70:
        rating = "Quite Decent";
        ratingClass = "quite-decent";
        break;
      case metacritic > 70 && metacritic <= 80:
        rating = "Pretty Good";
        ratingClass = "pretty-good";
        break;
      case metacritic > 80 && metacritic <= 90:
        rating = "Awesomesauce";
        ratingClass = "awesomesauce";
        break;
      case metacritic > 90 && metacritic <= 100:
        rating = "Glorious Masterpiece!";
        ratingClass = "masterpiece";
        break;
      default:
        rating = "N/A";
        ratingClass = "default";
    }

    return { rating, ratingClass };
  };

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
