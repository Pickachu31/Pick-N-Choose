const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json())

app.use('/assets', express.static(path.join(__dirname, '/../client/assets')))

app.get('/', (req ,res) => {
  res.status(200).sendFile(path.join(__dirname + '/../index.html'));
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
