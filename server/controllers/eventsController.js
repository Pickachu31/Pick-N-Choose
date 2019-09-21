'use strict';

const yelp = require('yelp-fusion');
const keys = require('../../apiKeys.js');
const client = yelp.client(keys['yelpApiKey']);

const eventsController = {};

eventsController.getEvents = async (req, res, next) => {
  await client.eventSearch({
    categories: 2,
    location: req.body.destination
  }).then(response => {
    res.locals = response.jsonBody.events.filter(event => {
      return event.time_end === null || new Date(event.time_end) > new Date();
    });
  }).catch(e => {
    console.log(e);
  })

  return next();
}

module.exports = eventsController;
