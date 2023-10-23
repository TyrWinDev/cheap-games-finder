import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImgSlider = ({ screenshots, name }) => {
  return (
    <div className="game-details__screenshots">
      <Carousel>
        {screenshots?.results.map((screenshot) => (
          <div key={screenshot.id}>
            <img src={screenshot.image} alt={`${name} Screenshot`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImgSlider;