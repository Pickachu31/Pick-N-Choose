//npm module: creates a new instance of the unirest client
const unirest = require("unirest"); 
const flightAPI = {}; 
//first middleware in the chain for the '/airportFetch' route. //middleware will take the request body data sent from the front end and send it off in a get request to the third party API. 
flightAPI.getAiportTravelDestination = (req, res, next)=>{ 
  //structure for a get request to this 3rd party API, we are trying to get all the current cities that are in the state/country/area that the client requests for. 
  const unirestRequest = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/"); //we send a parameter that will tell the third party api that we are SPEFICALLY looking for airports near the client's initial request. 
  unirestRequest.query({ "query": req.body.destination }) 
  //SAME headers for the request to skyscanner, the host and unique KEY (we had to create this key online) for access
  unirestRequest.headers({ "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com", "x-rapidapi-key": "2b3aee7f7emsh9a3043bf4a78f25p186a4ejsn07fdb9fc52ed" }); 
  //Once a response is sent back with the data from skyscanner's API, we receive it in this method below; 
  unirestRequest.end( (response)=>{ 
    if (response.error) {return new Error(response.error)}; 
    //caching the response data from the third party API in res.locals so that it persists throughout the cycle. 

    // console.log('here in first middleware chain', response.body.Places) 
    res.locals.places = response.body.Places; 
    return next(); 
  }); 
} 

//2nd middleware for the '/airportFetch', this midldleware will now have access to all of the persistent data (within the cycle) AKA stored in res.locals.places //the goal of this middleware is to now send another request to the 3rd party API to now find ALL of the airline prices from LAX to the input location. You can almost think of this as a BST... LOL 

flightAPI.getMinimumFlightPrices = (req, res, next)=>{ 
  const mappedData = res.locals.places.map( place =>{ 
    // the reason we need to instantiate a new promise despite the Promise.all on the mappedData variable above is because these request to the skyscanner API is another request to their db therefore we must wait for these get requests to resolve to be able to send it back to the client. I have tried to nest a Promise.all within the Promise.all as well as async/await & chaining the unirest npm module into a promise structure. unfortunately, none of these worked. 
    return new Promise( (resolve, reject)=>{ 
      //get request for a certain query: notice the route after /browsequotes/. We specify the country the user is in /US/, the currency /USD/, the locale you want the results in /en-US/, and airport from/LAX-sky/, to /a DYNAMIC USER INPUT (based off the place object passed in above in the map method), and outbound partial date /anytime. 
      const unirestRequest = unirest("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/LAX-sky/${place.PlaceId}/anytime`);

      unirestRequest.headers({ "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com", "x-rapidapi-key": "2b3aee7f7emsh9a3043bf4a78f25p186a4ejsn07fdb9fc52ed" });
      
      unirestRequest.end( (response) =>{ 
        //if response error, instantiate a new error instance and pass in the error from the response object 
        if (response.error) {
          return new Error(response.error);
        }
         //when the api get request resolves, the response comes in the response.body. we grab the 'Quotes' to get the object with the data; 
         console.log('response body in unirequest.end', response.body.Quotes) 
         // then we map over each of the objects and grab only the MinPrice which is now stored in the minPrices array. 
         const minPrices = response.body.Quotes.map(quote=> quote.MinPrice) //spread that shit and get the min 
         const min = Math.min(...minPrices); 
         //see the data logged here 
         // console.log('here in unirest reponse', {id: place.PlaceId, city: place.PlaceName, price: min}) 
         
         //promise object resolves/rejects, we want to keep track of the id/city/price in order to use this data on the front end to create components 
        if (response){ 
           console.log('here in second middleware chain', place.PlaceId) 
           resolve({id: place.PlaceId, city: place.PlaceName, price: min}) 
        } 
        else { 
          //reject that shiii 
          reject(); 
        } 
      }) 
    }) 
  }) 
  //to resolve ALL of the responses that come in. 
  Promise.all(mappedData) 
  .then(result =>{ 
    res.locals.places = result; 
    console.log('here in promise.all resolve', result) 
    return next(); 
  }) 
  .catch(err =>{ 
    return new Error(err); 
  }) 
} 

module.exports = flightAPI;