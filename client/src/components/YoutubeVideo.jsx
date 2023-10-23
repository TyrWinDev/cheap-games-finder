import React from 'react';

const YouTubeVideo = ({ videoId }) => {
  return (
    <iframe
      width="100%"
      height="100%"
      style={{borderRadius: '12px'}}
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube Video Player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default YouTubeVideo;
