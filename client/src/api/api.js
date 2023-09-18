import axios from 'axios';

export const gameApiURL = 'http://localhost:3001'; // Update this with the correct endpoint

// Function to fetch video game data
export const fetchVideoGame = async (searchQuery) => {
  try {
    const response = await axios.get(`${gameApiURL}/api/games?title=${searchQuery}`);
    const gameData = response.data.results;

    return gameData;
  } catch (error) {
    console.error('Error fetching video game data:', error);
    return null;
  }
};



// Get Game Details from Rawg
export const fetchGameDetails = async (gameID) => {
  try {
    const response = await axios.get(`${gameApiURL}/api/games/${gameID}`);
    const gameDetails = response.data;

    // Search for the price using the game name
    const cheapSharkResponse = await axios.get(`${gameApiURL}/api/deals?title=${gameDetails.name}`);
    const deals = cheapSharkResponse.data;

    gameDetails.cheapest = deals[0].cheapest;
    gameDetails.cheapestDealID = deals[0].cheapestDealID;

    // Fetch trailers
    const trailersResponse = await fetchGameTrailer(gameDetails.name);
    gameDetails.trailers = trailersResponse;

    // Fetch reviews
    const reviewsResponse = await fetchGameReview(gameDetails.name);
    gameDetails.reviews = reviewsResponse;

    // Fetch screenshots
    const screenshotsResponse = await fetchGameScreenshots(gameID);
    gameDetails.screenshots = screenshotsResponse;

    return gameDetails;
  } catch (error) {
    console.error('Error fetching game details', error);
    return null;
  }
};


// Fetch game trailer
export const fetchGameTrailer = async (gameName) => {
  try {
    const response = await axios.get(`${gameApiURL}/api/youtube?gameName=${gameName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game trailer', error);
    return null;
  }
};

// Fetch game review
export const fetchGameReview = async (gameName) => {
  try {
    const response = await axios.get(`${gameApiURL}/api/youtube/review?gameName=${gameName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game review', error);
    return null;
  }
};


// Fetch game screenshots
export const fetchGameScreenshots = async (gameID) => {
  try {
    const response = await axios.get(`${gameApiURL}/api/games/${gameID}/screenshots`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game screenshots', error);
    return null;
  }
};




// Function to fetch trending deals
export const fetchTrendingDeals = async () => {
  try {
    const response = await axios.get(`${gameApiURL}/api/trending-deals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending deals:', error);
    return null;
  }
};
