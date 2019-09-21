// //npm module: creates a new instance of the unirest client
// const unirest = require("unirest");
//
// const flightAPI = {};
//
//
// flightAPI.getFlightPrices = (req, res, next)=>{
//     //get request for a certain query: notice the route after /browsequotes/. We specify the country the user is in /US/, the currency /USD/, the locale you want the results in /en-US/, and airport from/SFO-sky/, to /LAX-sky, and outbound partial date /anytime.
//     var req = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/LAX-sky/anytime");
//     //headers for the request to skyscanner, the host and unique KEY for access
//     req.headers({
//
// function fetchPrices (place){
//   const unirestRequest = unirest("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/LAX-sky/${place.PlaceId}/anytime`);
//     //headers for the request to skyscanner, the host and unique KEY for access
//     unirestRequest.headers({
//         "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
//         "x-rapidapi-key": "2b3aee7f7emsh9a3043bf4a78f25p186a4ejsn07fdb9fc52ed"
//     });
//
//     req.end(function (res) {
//         if (res.error) throw new Error(res.error);
//         console.log(res.body);
//         return next();
//     });
// }
//
//
// flightAPI.getAiportTravelDestination = (req, res, next)=>{
//     console.log(req.body)
//     const unirestRequest = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/");
//     //NEW get request to find all of the airports to land in, in Australia
//     unirestRequest.query({
//         "query": 'Australia'
//     unirestRequest.end(function (response) {
//       console.log('res in unirestRequest', response.body)
//
//         if (response.error) throw new Error(response.error);
//         const minPrices = response.body.Quotes.map(quote=> quote.MinPrice)
//         console.log(minPrices);
//         const min = Math.min(...minPrices);
//         // res.locals.places.minPrice = min
//         console.log('placeId log',place.PlaceName,)
//         return {id: place.PlaceId, city: place.PlaceName, price: min};
//     });
// }
//
// flightAPI.getFlightPrices = (req, res, next)=>{
//     //get request for a certain query: notice the route after /browsequotes/. We specify the country the user is in /US/, the currency /USD/, the locale you want the results in /en-US/, and airport from/SFO-sky/, to /LAX-sky, and outbound partial date /anytime.
//
//     const placesAndPrices = [];
//     // res.locals.places // 4 objects
//     Promise.all(res.locals.places.map(place =>{
//       return fetchPrices(place);
//     }))
//     .then(res =>{
//       console.log(res);
//     })
//
//   // res.locals.placesAndPrices = placesAndPrices;
//   // console.log('here in console log outside of loop',res.locals.placesAndPrices);
//   // return next();
// }
//
//
// flightAPI.getAiportTravelDestination = (req, res, next)=>{
//     const unirestRequest = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/");
//     //NEW get request to find all of the airports to land in, in Australia
//     unirestRequest.query({
//         "query": req.body.destination
//     })
//     //SAME headers for the request to skyscanner, the host and unique KEY for access
//     unirestRequest.headers({
//         "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
//         "x-rapidapi-key": "2b3aee7f7emsh9a3043bf4a78f25p186a4ejsn07fdb9fc52ed"
//     });
//     //SAME on a response expect a response of queried data
//
//     unirestRequest.end( (response)=>{
//         if (response.error) throw new Error(response.error);
//         res.locals.places = response.body.Places;
//         return next();
//     });
//
// }
// module.exports = flightAPI;
