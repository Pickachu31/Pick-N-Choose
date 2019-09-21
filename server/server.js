const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;
//controller for flight API
const flightAPI = require('./flightControllers/flightControllers.js');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/assets', express.static(path.join(__dirname, '/../client/assets')))

app.get('/', (req ,res) => {
  res.status(200).sendFile(path.join(__dirname + '/../index.html'));
});
//getting all of the airport locations 
app.post('/airportFetch', flightAPI.getAiportTravelDestination, flightAPI.getFlightPrices, (req, res)=>{
  console.log('fetch is complete')
  res.status(200).send(res.locals.places)
})

app.get('/flightFetch', flightAPI.getFlightPrices , (req, res)=>{
    console.log(res.body)
})



app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  }
  const errObj = Object.assign((err, defaultErr));
  console.log(errObj.log);

  res.sendStatus(errObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
