
/*
  Simple Node.js proxy for Skiddle API.
  Usage:
    1. Set environment variable SKIDDLE_API_KEY (recommended)
       export SKIDDLE_API_KEY=yourkey
    2. npm install
    3. node server.js
*/
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const SKIDDLE_API_KEY = process.env.SKIDDLE_API_KEY || "d354bd79e6583e1b4f408c9dca70b2d5"; // fallback; recommended to set env var

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow CORS for development
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static PWA files from /public (we will serve from 'public' folder)
app.use('/', express.static(path.join(__dirname, 'public')));

// Proxy endpoint
app.get('/api/events', async (req, res) => {
  try {
    // Build Skiddle URL with api_key attached
    const params = new URLSearchParams(req.query);
    params.set('api_key', SKIDDLE_API_KEY);

    const skiddleUrl = 'https://www.skiddle.com/api/v1/events/search/?' + params.toString();
    const response = await fetch(skiddleUrl);
    const text = await response.text();
    // forward status and body
    res.status(response.status).send(text);
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: 'Proxy error' });
  }
});

// Fallback - serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
