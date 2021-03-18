const express = require("express");         //import express module
const bodyParser = require("body-parser");  //import body-parser module
const cors = require("cors");               //import cors module
const ejs = require("ejs");                 //import ejs module
const app = express();                      //use express module
require("dotenv").config();                 //import .env file
const open = require('open');               //import open module
const PORT = process.env.PORT || 4000;      //Define PORT

//importing  initPayment and responsePayment from Paytm index file
const {initPayment, responsePayment} = require("./paytm/services/index");

app.use(cors());               //cors middleware

app.use(bodyParser.json());    //bodyparser middleware
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/views"));  //setting view using middleware
app.set("view engine", "ejs");                  //Set view engine


//Get method for paytm request
app.get("/paywithpaytm", (req, res) => {
    //initial payment start if receive request
    initPayment(req.query.amount).then(
	//if amount is valid then success method
         success => {
              res.render("paytmRedirect.ejs", {
                  resultData: success,
                  paytmFinalUrl: process.env.PAYTM_FINAL_URL
                                              });
                    },
	//if amount is not valid
        error => {
            res.send(error);
                 }
                                      );
});


//post method for response from paytm
app.post("/paywithpaytmresponse", (req, res) => {
    //Response from Paytm API
    responsePayment(req.body).then(
	//If payment is successful then show receipt
        success => {
		
            res.render("response.ejs", {resultData: "true", responseData: success});
						
        },
	//If payment is unsuccessful
        error => {
            res.send(error);
        }
    );
});

//listening to server on PORT 4000
app.listen(PORT, () => {
    console.log("Running on " + PORT);
});
