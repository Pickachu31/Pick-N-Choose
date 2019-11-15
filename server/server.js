const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = 3000;
//controller for flight API (skyskanner)
const flightAPI = require('./controllers/flightControllers.js');
//controller for events API (yelp)
const eventsAPI = require('./controllers/eventsController.js');

const postgresDB = require('./data/postgres');

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/assets', express.static(path.join(__dirname, '/../client/assets')))


app.get('/', (req ,res) => {
  res.status(200).sendFile(path.join(__dirname + '/../index.html'));
});
//fetching cheapest airport pricess
app.post('/airportFetch', flightAPI.getAiportTravelDestination, flightAPI.getMinimumFlightPrices, (req, res)=>{
  res.json({prices: res.locals.mappedData});
});

//fetching all events and activities
app.post('/events&activities', eventsAPI.getActivities, (req, res) => {
  res.json({activities: res.locals.businesses});
});

//login validation
app.post('/loginValidation', postgresDB.authenticate, (req, res)=>{
  res.json({authenticated: res.locals.authenticated})
})
//signup validation
app.post('/signUp', postgresDB.signUp, (req, res)=>{
  res.json({inserted: res.locals.inserted})
})

app.all('*', (req, res) => {
  res.sendStatus(404);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
