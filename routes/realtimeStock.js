const express = require('express');
const router = express.Router();
const unirest = require('unirest');
const {apiKey} = require('../config');

// This API is to find the real time price of a stock, whose ticker is specified.
// Usage = localhost:5000/realTime/<stock ticker>

router.get('/:stock', (req, res) => {
    var request = unirest("GET", "https://twelve-data1.p.rapidapi.com/price");

    request.query({"symbol": req.params['stock'], "outputsize": "30", "format": "json"});

    request.headers({"x-rapidapi-key": apiKey, "x-rapidapi-host": "twelve-data1.p.rapidapi.com", "useQueryString": true});


    request.end(function (res1) {
        if (res1.error) 
            throw new Error(res1.error);
        

        var date = new Date();        
        var time =date.getHours()+":"+date.getMinutes();


        console.log(`Time ${time}: The real time of the stock ${
            req.params['stock']
        } has been fetched`);

        res1.body['time']= time;

        res.send(res1.body);
    });
});

module.exports = router;
