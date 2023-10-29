import React, { useEffect, useState } from "react";
import { useParams, Link, Router } from "react-router-dom";
import { fetchGameDetails } from "../api/api";
import { getRating } from "../utils/utils";
import YouTubeVideo from "./YoutubeVideo";
import "../styles/gameDetails.scss";
import "../styles/app.scss";
import ImgSlider from "./ImgSlider";

const GameDetails = ({ loading }) => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("trailer");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchGameDetails(id);
        if (details) {
          setGameDetails(details);
        }
        console.log("Game details", details);
      } catch (error) {
        console.error("Error fetching game details", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!gameDetails && !loading) {
    return (
      <div>
        <h2>Loading game details...</h2>
        <Link to={`/`}>Go Back...</Link>
      </div>
    );
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
    released,
    reviews,
    screenshots,
    tags,
    trailers,
  } = gameDetails;
  const cheapSharkDealURL = `https://www.cheapshark.com/redirect?dealID=${cheapestDealID}`;

  const { rating, ratingClass } = getRating(metacritic);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="game-details__container">
      <h1>Game Details</h1>

      <header className="game-details__game-container">
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
            <em>Avg. Playtime: {playtime} hours</em>
          </div>
          <div className={`game-list__rating-container`}>
            <span className={`game-list__rating ${ratingClass}`}>
              {!metacritic ? "N/A" : metacritic}
            </span>
            <h4 className="game-details__rating-text">{rating}</h4>
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
            <button className="game-list__button">
              <Link
                to={cheapSharkDealURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>Buy Now for: ${cheapest}</h3>
              </Link>
            </button>
          </div>
        </section>
      </header>

      <section className="game-details__description-container">
        <div className="game-details__description-title">
          <h3 className="mt-0">Description</h3>
        </div>
        <article className="game-details__description">
          <p>{description_raw !== "" ? description_raw : description}</p>
        </article>
      </section>

      <section className="game-details__videos-container">
        <div className="game-details__tabs-container">
          {activeTab === "trailer" && trailers ? (
            <div
              className={`game-details__tab ${
                activeTab === "trailer" ? "active" : ""
              }`}
              onClick={() => handleTabClick("trailer")}
            >
              <h3 className="mt-0">Trailer</h3>
            </div>
          ) : (
            <div
              className={`game-details__tab ${
                activeTab === "review" ? "active" : ""
              }`}
              onClick={() => handleTabClick("review")}
            >
              <h3 className="mt-0">Review</h3>
            </div>
          )}
        </div>

        <div className="game-details__video-container">
          {activeTab === "trailer" && trailers && (
            <>
              <YouTubeVideo
                key={trailers.videoId}
                videoId={trailers.id.videoId}
              />
              <div className="game-list__video-container__button-container">
                <button
                  className="game-list__button"
                  onClick={() => handleTabClick("review")}
                >
                  Done watching? Watch a Review next!
                </button>
              </div>
            </>
          )}
          {activeTab === "review" && reviews && (
            <>
              <YouTubeVideo
                key={reviews.videoId}
                videoId={reviews.id.videoId}
              />
              <div className="game-list__video-container__button-container">
                <button
                  className="game-list__button"
                  onClick={() => handleTabClick("trailer")}
                >
                  Done watching? Watch a Trailer next!
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="game-details__screenshots-container">
        <h3 className="mt-0">Screenshots</h3>
        <ImgSlider screenshots={screenshots} name={name} />
      </section>

      <div className="game-details__link-container">
        <button className="game-list__button">
          <Link to={`/`}>Go Back...</Link>
        </button>
      </div>
    </main>
  );
};

export default GameDetails;
