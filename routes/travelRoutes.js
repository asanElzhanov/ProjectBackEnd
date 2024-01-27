const express = require('express');
const router = express.Router();
const path = require('path');

// Handle GET request to /travelagency
router.get('/travelagency', (req, res) => {
  res.render('index', { message: 'Hello from the server!' });
});

// Handle GET requests for other pages
router.get('/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(`${page}.html`, { root: path.join(__dirname, '../public') });
});

// Handle POST request to /travelagency
router.post('/travelagency', (req, res) => {
  // Add logic for handling POST requests
  res.send('POST request to /travelagency');
});

module.exports = router;
