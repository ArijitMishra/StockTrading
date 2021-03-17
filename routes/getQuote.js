// This end point can be used to get the latest quote of the specified stock

// Usage : localhost:5000/getQuote/<stock>

// Example response
// {
//     "symbol": "AMZN",
//     "name": "Amazon.com Inc",
//     "exchange": "NASDAQ",
//     "currency": "USD",
//     "datetime": "2021-02-22",
//     "open": "3208.12988",
//     "high": "3230.92993",
//     "low": "3172.26001",
//     "close": "3180.73999",
//     "volume": "3339089",
//     "previous_close": "3251.00000",
//     "change": "-70.26001",
//     "percent_change": "-2.16118",
//     "average_volume": "2920052",
//     "fifty_two_week": {
//         "low": "1626.03003",
//         "high": "3552.25000",
//         "low_change": "1554.70996",
//         "high_change": "-371.51001",
//         "low_change_percent": "95.61385",
//         "high_change_percent": "-10.45844",
//         "range": "1626.030029 - 3552.250000"
//     }
// }


const express = require('express');
const router = express.Router();
const unirest = require('unirest');
const {apiKey} = require('../config');

router.get('/:stock', (req, res) => {
    var request = unirest("GET", "https://twelve-data1.p.rapidapi.com/quote");

    request.query({"symbol": req.params['stock'], "interval": "1day", "format": "json", "outputsize": "30"});

    request.headers({"x-rapidapi-key": apiKey, "x-rapidapi-host": "twelve-data1.p.rapidapi.com", "useQueryString": true});


    request.end(function (res1) {
        if (res1.error) 
            throw new Error(res1.error);
        
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes();
        console.log(`Time ${time}: Quote for ${
            req.params['stock']
        } has been fetched`);
        res1.body.datetime = date;
        res.send(res1.body);
    });
});

module.exports = router;
