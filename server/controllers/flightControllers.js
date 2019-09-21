//npm module: creates a new instance of the unirest client
const unirest = require("unirest");

const flightAPI = {};


flightAPI.getFlightPrices = (req, res, next)=>{
    //get request for a certain query: notice the route after /browsequotes/. We specify the country the user is in /US/, the currency /USD/, the locale you want the results in /en-US/, and airport from/SFO-sky/, to /LAX-sky, and outbound partial date /anytime.
    var req = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/LAX-sky/anytime");
    //headers for the request to skyscanner, the host and unique KEY for access
    req.headers({
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "2b3aee7f7emsh9a3043bf4a78f25p186a4ejsn07fdb9fc52ed"
    });

    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.body);
        return next();
    });
}


flightAPI.getAiportTravelDestination = (req, res, next)=>{
    console.log(req.body)
    const unirestRequest = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/");
    //NEW get request to find all of the airports to land in, in Australia
    unirestRequest.query({
        "query": 'Australia'
    })
    //SAME headers for the request to skyscanner, the host and unique KEY for access
    unirestRequest.headers({
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "2b3aee7f7emsh9a3043bf4a78f25p186a4ejsn07fdb9fc52ed"
    });
    //SAME on a response expect a response of queried data
    unirestRequest.end( (res)=>{
        if (res.error) throw new Error(res.error);
        console.log(res.body);
        return next();
    });
    
}
module.exports = flightAPI;