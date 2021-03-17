const express = require('express');
const app = express();
var cors = require('cors');


app.use(cors());


const stockRoute = require('./routes/stockFind.js');
const stockPrice = require('./routes/realtimeStock.js');
const timeSeries = require('./routes/timeSeries.js');
const quote = require('./routes/getQuote.js');
app.use(express.json());

app.use('/findStocks', stockRoute);
app.use('/realTime', stockPrice);
app.use('/timeSeries',timeSeries);
app.use('/getQuote',quote);


app.listen(5000, () => {
    console.log("Listning on port 5000")
})
