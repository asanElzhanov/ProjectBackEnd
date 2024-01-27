const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add this line to parse request bodies
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); // Use bodyParser middleware

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

const travelRoutes = require('./routes/travelRoutes');
app.use('/', travelRoutes);

// Array to store tour data (simulate a database)
let tours = [
    {
        id: 1,
        name: 'Tour Package One #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec nisl odio. Mauris vehicula at nunc id posuere.',
        cost: 100
    },
    // Add more tours as needed
];

// Render the initial page with existing tours
app.get('/', (req, res) => {
    res.render('index', { tours });
});

// Handle POST request to add a new tour
// Handle POST request to add a new tour
app.post('/addTour', (req, res) => {
  const { name, description, cost } = req.body;
  const newTour = {
      id: tours.length + 1,
      name,
      description,
      cost: parseInt(cost),
  };
  tours.push(newTour);
});

app.get('/getWeather', async (req, res) => {
    try {
      const apiKey = '5350dd8a37fb4c75827123533242401 ';
      const city = req.query.city || 'New York';
  
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
  
      const weatherData = {
        location: response.data.location.name,
        temperature: response.data.current.temp_c,
        condition: response.data.current.condition.text,
        windSpeed: response.data.current.wind_mph,
      };
  
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// Handle DELETE request to remove a tour
app.delete('/deleteTour/:id', (req, res) => {
    const { id } = req.params;
    tours = tours.filter(tour => tour.id !== parseInt(id));
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
