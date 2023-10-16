import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGameDetails } from '../api/api';
import YouTubeVideo from './YoutubeVideo';


import '../styles/gameDetails.scss';
import '../styles/app.scss'

const GameDetails = ({loading}) => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchGameDetails(id);
        if (details) {
          setGameDetails(details);
        }
        console.log('Game details', details);
      } catch (error) {
        console.error('Error fetching game details', error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!gameDetails && !loading) {
    return <div>
      <h2>ERROR 404. Game has no details available...</h2>
      <Link to={`/`}>Go Back...</Link>
    </div>;
  }

  const {
    name,
    background_image,
    cheapest,
    cheapestDealID,
    description,
    description_raw,
    developers,
    esrb_rating,
    genres,
    metacritic,
    platforms,
    playtime,
    publishers,
    rating,
    released,
    reviews,
    screenshots,
    tags,
    trailers,
  } = gameDetails;
  const cheapSharkDealURL = `https://www.cheapshark.com/redirect?dealID=${cheapestDealID}`;

  return (
    <main className='game-details__container'>
      <h1>Game Details</h1>

      <header className='game-details__game-container'>
        <figure className="game-details__image-container">
          <img
            className="game-details__image"
            src={background_image}
            alt="Game Cover"
          />
        </figure>



        <section className="game-details__details-container">
          <div className="game-details__title-container">
            <h2>{name}</h2>
          </div>
          <div className="game-details__info-container">
            <span>{publishers[0]?.name}</span>
            {" / "}
            <span>{released}</span>
            {" / "}
            <span>{esrb_rating?.name}</span>
            {" / "}
            <span>{genres[0]?.name}</span>
          </div>

          <div className="game-details__platforms-container">
          {platforms?.map((platform) => (
            <span
              className="game-details__platforms"
              key={platform.platform.id}
            >
              <i>{platform.platform.name}</i>
            </span>
          ))}
          </div>

          {/* USE FOR NEW DIV  */}
          {/* <span>Metacritic Score: {metacritic}</span>
            <span>Playtime: {playtime} hours</span>
            <span>Rating: {rating}</span> */}

          <div className="game-details__price-container">
          <span>Cheapest Price: {cheapest}</span>
          <Link to={cheapSharkDealURL} target="_blank" rel="noopener noreferrer">
            <h3>Buy Now</h3>
          </Link>
        </div>
        </section>
      </header>

      <section className="game-details__description-container">
        <div className="game-details__description-title">
          <h3>Description</h3>
        </div>
        <article className="game-details__description">
          <p>{description_raw !== "" ? description_raw : description}</p>
        </article>
      </section>

      <div className="game-details__tags-container">
        <span>Tags: {tags?.map((tag) => tag.name).join(', ')}</span>
      </div>

      <section className="game-details__videos-container">
        <div className="game-details__trailers-container">
          {trailers && (
            <div>
              <h3>Trailer</h3>
              <YouTubeVideo
                key={trailers.videoId}
                videoId={trailers.id.videoId}
              />
            </div>
          )}
        </div>

        <div className="game-details__reviews-container">
          {reviews && (
            <div>
              <h3>Review</h3>
              <YouTubeVideo
                key={reviews.videoId}
                videoId={reviews.id.videoId}
              />
            </div>
          )}
        </div>
      </section>

      <section className="game-details__screenshots-container">
        <h3>Screenshots</h3>
        <div className="game-details__screenshots">
          {screenshots?.results.map((screenshot) => (
            <img
              key={screenshot.id}
              src={screenshot.image}
              alt={`${name} Screenshot`}
            />
          ))}
        </div>
      </section>

      <div className="game-details__link-container">
        <Link to={`/`}>Go Back...</Link>
      </div>
    </main>
  );
};

export default GameDetails;