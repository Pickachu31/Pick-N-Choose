'use strict';

const yelp = require('yelp-fusion');
const keys = require('../../apiKeys.js');
const client = yelp.client(keys['yelpApiKey']);

function getEvents(location, next) {
  client.eventSearch({
    categories: 2,
    is_free: true,
    location: 'claremont, ca'
  }).then(response => {
    console.log(response.jsonBody.events[0].name);
  }).catch(e => {
    console.log(e);
  });

  return next();
}
