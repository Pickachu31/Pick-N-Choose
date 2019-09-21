const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//npm module: creates a new instance of the unirest client
const unirest = require("unirest");

const app = express();
const PORT = 3000;

app.use(bodyParser.json())

app.use('/assets', express.static(path.join(__dirname, '/../client/assets')))

app.get('/', (req ,res) => {
  res.status(200).sendFile(path.join(__dirname + '/../index.html'));
});



//get request for a certain query: notice the route after /browsequotes/. We specify the country the user is in /US/, the currency /USD/, the locale you want the results in /en-US/, and airport from/SFO-sky/, to /LAX-sky, and outbound partial date /anytime.
var req = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/LAX-sky/anytime");

//headers for the request to skyscanner, the host and unique KEY for access
req.headers({
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": "2b3aee7f7emsh9a3043bf4a78f25p186a4ejsn07fdb9fc52ed"
});

//on a response expect a response of queried data
req.end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.body);
});




app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  }
  const errObj = Object.assign((defaultErr, err));
  console.log(errObj.log);

  res.sendStatus(errObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
