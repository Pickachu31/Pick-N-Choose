
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;
//controller for flight API (skyskanner)
const flightAPI = require('./controllers/flightControllers.js');
//controller for events API (yelp)
const eventsAPI = require('./controllers/eventsController.js');

// var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
// app.set('trust proxy', true);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/assets', express.static(path.join(__dirname, '/../client/assets')))


app.get('/', (req ,res) => {
  res.status(200).sendFile(path.join(__dirname + '/../index.html'));
});

app.post('/airportFetch', flightAPI.getAiportTravelDestination, flightAPI.getMinimumFlightPrices, (req, res)=>{
  res.json({prices: res.locals.mappedData});
});

app.post('/events&activities', eventsAPI.getActivities, (req, res) => {
  res.json({activities: res.locals.businesses});
});


app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  // console.log(err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  }
  const errObj = Object.assign((err, defaultErr));
  // console.log(errObj.log);

  res.sendStatus(errObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
