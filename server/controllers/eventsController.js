'use strict';

const yelp = require('yelp-fusion');
const keys = require('../../apiKeys.js');
const client = yelp.client(keys['yelpApiKey']);

const eventsController = {};

eventsController.getEvents = async (req, res, next) => {
  await client.eventSearch({
    categories: 2,
    is_free: true,
    location: req.body.destination
  }).then(response => {
    res.locals.events = response.jsonBody.events;
  }).catch(e => {
    console.log(e);
  })

  return next();
}

module.exports = eventsController;
