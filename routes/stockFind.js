// Using 12 Data API
// Using this to find which stocks are there

// Example response
// {
//     "statusCode": 200,
//     "body": {
//         "data": [
//             {
//                 "symbol": "AA",
//                 "instrument_name": "Alcoa Corp",
//                 "exchange": "NYSE",
//                 "exchange_timezone": "America/New_York",
//                 "instrument_type": "Common Stock",
//                 "country": "United States",
//                 "currency": "USD"
//             },
//             {
//                 "symbol": "AAPL",
//                 "instrument_name": "Apple Inc",
//                 "exchange": "NASDAQ",
//                 "exchange_timezone": "America/New_York",
//                 "instrument_type": "Common Stock",
//                 "country": "United States",
//                 "currency": "USD"
//             },
//             {
//                 "symbol": "AAL",
//                 "instrument_name": "Anglo American PLC",
//                 "exchange": "LSE",
//                 "exchange_timezone": "Europe/London",
//                 "instrument_type": "Common Stock",
//                 "country": "United Kingdom",
//                 "currency": "GBp"
//             }
//         ],
//         "status": "ok"
//     }
// }

const express = require('express');
const router = express.Router();
const unirest = require('unirest');
const {apiKey} = require('../config');

router.get('/', (req, res) => { // Not recommended, gives all the stocks possible to get
    
    var req = unirest("GET", "https://twelve-data1.p.rapidapi.com/symbol_search");

    req.query({"outputsize": "30"});

    req.headers({"x-rapidapi-key": apiKey, "x-rapidapi-host": "twelve-data1.p.rapidapi.com", "useQueryString": true});


    req.end(function (res1) {
        if (res1.error) 
            throw new Error(res1.error);
        

        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes();
        console.log(`Time ${time}: All stocks have been fetched`);
        res.send(res1.body);
    });
})
router.get('/:expr', (req, res) => { // Use this to specify few starting characters
    var request = unirest("GET", "https://twelve-data1.p.rapidapi.com/symbol_search");

    request.query({"symbol": req.params['expr'], "outputsize": "50"});

    request.headers({"x-rapidapi-key": apiKey, "x-rapidapi-host": "twelve-data1.p.rapidapi.com", "useQueryString": true});


    request.end(function (res1) {
        if (res1.error) 
            throw new Error(res1.error);
        

        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes();
        console.log(`Time ${time}: Stocks matching the expression has been fetched`);
        res.send(res1.body);
    });

});

module.exports = router;
