const express = require('express');
const router = express.Router();
const unirest = require('unirest');
const {apiKey} = require('../config');

// This API is to be called to get the time series data of a ticker
// This can be useful to make the initial chart on the dashboard
// Usage : localhost:5000/realTime/<Stock> == Will give data with interval of 1 day for 30 days
// Usage localhost:5000/realTime/<stock>/<inteval> == Will give data with the interval mentioned.
// Supported intervals are 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 8h, 1day, 1week, 1month for 30 entries.
// Example respones given below
// {
//     "meta":{6 items
//     "currency":"USD"
//     "exchange":"NASDAQ"
//     "exchange_timezone":"America/New_York"
//     "interval":"1day"
//     "symbol":"AMZN"
//     "type":"Common Stock"
//     }
//     "status":"ok"
//     "values":[30 items
//     0:{6 items
//     "close":"3178.00000"
//     "datetime":"2020-09-14"
//     "high":"3178.77002"
//     "low":"3144.25195"
//     "open":"3172.93726"
//     "volume":"976262"
//     }
//     1:{...}6 items
//     2:{...}6 items
//     3:{...}6 items
//     4:{...}6 items
//     5:{...}6 items


router.get('/:stock', (req, res) => {
    var request = unirest("GET", "https://twelve-data1.p.rapidapi.com/time_series");

    request.query({"symbol": req.params['stock'], "interval": "1day", "outputsize": "50", "format": "json"});

    request.headers({"x-rapidapi-key": apiKey, "x-rapidapi-host": "twelve-data1.p.rapidapi.com", "useQueryString": true});


    request.end(function (res1) {
        if (res1.error) 
            throw new Error(res1.error);
        


        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes();

        console.log(`Time ${time}: Time series data for the stock ${
            req.params['stock']
        } has been fetched`);
        res1.body.datetime = date;
        res.send(res1.body);
    });
});

router.get('/:stock/:interval', (req, res) => {
    var request = unirest("GET", "https://twelve-data1.p.rapidapi.com/time_series");

    request.query({"symbol": req.params['stock'], "interval": req.params['interval'], "outputsize": "30", "format": "json"});

    request.headers({"x-rapidapi-key": apiKey, "x-rapidapi-host": "twelve-data1.p.rapidapi.com", "useQueryString": true});


    request.end(function (res1) {
        if (res1.error) 
            throw new Error(res1.error);
        


        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes();

        console.log(`Time ${time}: Time series data for the stock ${
            req.params['stock']
        } has been fetched with interval ${
            req.params['interval']
        }`);
        res1.body.datetime = date;
        res.send(res1.body);
    });

});


module.exports = router;
