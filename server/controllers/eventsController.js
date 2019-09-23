'use strict';

const yelp = require('yelp-fusion');
const keys = require('../../apiKeys.js');
const client = yelp.client(keys['yelpApiKey']);

const eventsController = {};

eventsController.getEvents = async (req, res, next) => {
  await client.eventSearch({
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

eventsController.getActivities = async (req, res, next) => {
  await client.search({
    term: 'activities',
    location: req.body.destination,
    limit:15,
  }).then(response => {
    // console.log(response.jsonBody.businesses)
    res.locals.businesses = response.jsonBody.businesses;
    // console.log('response.jsonBody.businesses.activities', response.jsonBody.businesses)
  }).catch(e => {
    console.log('Error in event Controller file for middleware .getActivities', e);
  });
  return next();
}

module.exports = eventsController;
