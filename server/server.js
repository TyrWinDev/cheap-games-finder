const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');


const app = express();
const port = 3000;
dotenv.config();

const RAWG_API_KEY = `${process.env.REACT_APP_RAWG_API_KEY}`; 
const YT_API = `${process.env.REACT_APP_YT_API}`;

app.use(cors({
  origin: '*', 
  methods: 'GET, POST, OPTIONS',
  allowedHeaders: 'Content-Type',
}));

// RAWG API

// Get Game Details by ID
app.get('/api/games/:id', async (req, res) => {
  const { id } = req.params;
  const apiUrl = `https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching game details', error);
    res.status(500).json({ error: 'An error occurred while fetching game details' });
  }
});

// Get Games by Title
app.get('/api/games', async (req, res) => {
  const { title } = req.query;
  const apiUrl = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${title}&page_size=10`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching game data', error);
    res.status(500).json({ error: 'An error occurred while fetching game data' });
  }
});

// Get Game Screenshots by ID
app.get('/api/games/:id/screenshots', async (req, res) => {
  const { id } = req.params;
  const apiUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${RAWG_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching screenshots', error);
    res.status(500).json({ error: 'An error occurred while fetching screenshots' });
  }
});



//CHEAPSHARK API


//Get deals by title
app.get('/api/deals', async (req, res) => {
  const { title } = req.query;
  const apiUrl = `https://www.cheapshark.com/api/1.0/games?title=${title}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching deal data', error);
    res.status(500).json({ error: 'An error occurred while fetching deal data' });
  }
});

//Get deal by ID
app.get('/api/deals/:id', async (req, res) => {
  const { id } = req.query;
  const apiUrl = `https://www.cheapshark.com/api/1.0/games?id=${id}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching deal data', error);
    res.status(500).json({ error: 'An error occurred while fetching deal data' });
  }
});

//Get trending deals
app.get('/api/trending-deals', async (req, res) => {
  const apiUrl = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching trending deals', error);
    res.status(500).json({ error: 'An error occurred while fetching trending deals' });
  }
});


//YOUTUBE API

//Get video by title
app.get('/api/youtube', async (req, res) => {
  const { gameName } = req.query;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${gameName} trailer&key=${YT_API}`
    );
    res.json(response.data.items[0]);
  } catch (error) {
    console.error('Error fetching YouTube video', error);
    res.status(500).json({ error: 'An error occurred while fetching YouTube video' });
  }
});

//Get video review by title
app.get('/api/youtube/review', async (req, res) => {
  const { gameName } = req.query;


  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${gameName} review&key=${YT_API}`
    );
    res.json(response.data.items[0]);
  } catch (error) {
    console.error('Error fetching YouTube video', error);
    res.status(500).json({ error: 'An error occurred while fetching YouTube video' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
