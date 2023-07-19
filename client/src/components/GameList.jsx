import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/gameList.css';

const GameList = ({ games }) => {
  // Filter games with cheapest price
  const filteredGames = games.filter((game) => game.cheapest && game.metacritic);


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
        rating = "";
        ratingClass = "no-rating";
    }
  
    return { rating, ratingClass };
  };

  return (
    <div className="game-list__container">
      {filteredGames.map((game) => {
        const { metacritic } = game;
        const { rating, ratingClass } = getRating(metacritic);

        return (
        <div className="game-list__game-container" key={game.id}>
          <div className={`game-list__rating-container ${ratingClass}`}>
            <span className={`game-list__rating ${ratingClass}`}>{game.metacritic}</span>
          </div>

          <div className="game-list__image-container">
            <img
              className="game-list__image"
              src={game.background_image}
              alt={game.name}
            />
          </div>

          <div className="game-list__main-container">
            <div className="game-list__title-container">
              <h3 id="game-list__title">{game.name}</h3>
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
            </div>
            <div className="game-list__genres">
              {game.genres.map((genre) => (
                <span id="game-list-genre" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
            <div className='game-list__playtime-rating'>
              <span id="game-list__released">{game.released}</span>
              {game.playtime !== 0 && (
                <h4 id="game-list__playtime">
                  {`Average Playtime: ${game.playtime} hours`}
                </h4>
              )}
              <h4 className={`${ratingClass}`}>{rating}</h4>
            </div>
            <div className="game-list__description">
            <p>
              {game.description.length > 150 ? game.description.slice(0, 300) + '...' : game.description}
            </p>
            <Link to={`/game/${game.id}`}>Learn More...</Link>
            </div>
            <div className="game-list__button-container">
              <button className="game-list__button">Add to Favorites</button>
              <button className="game-list__button">Add to Wishlist</button>
            </div>
          </div>

          <div className="game-list__price-container">
            <span id="game-list__price">{`Cheapest Price: $${game.cheapest}`}</span>
          </div>
          {/* Render other game details */}
        </div>
      )})}
    </div>
  );
};

export default GameList;
