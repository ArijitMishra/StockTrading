const express = require('express');          //import export module
const app = express();                       //using express
const path = require('path');                //import path module
const bodyParser = require('body-parser');   //import body-parser module
const mongoose = require('mongoose');        //import mongoose module
const Registration = require("./model");     //import model from model.ts file
var crypto = require('crypto');              //import crypto module
var cors = require('cors');                  //import cors module
const jwt=require('jsonwebtoken');           //import jsonwebtoken
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())                   //bodyparser middleware
app.use(cors());                             //middleware for cors



app.get('*', (req, res) => {
    res.send("NodeJs 404 not found"); //for any wrong url show message NOT FOUND 404
});

//POST METHOD FOR LOGIN
app.post('/login', (req, res) => {
    console.log(req.body);
    

     //findOne will search whether Email exist on database or not 
    Registration.findOne({ Email: req.body.Email }, function(err, response) {
        if (err) {
            console.log(err);
                 }
        else{      
		         //if no response from database
			if(!response)  
			{
				let error={err:false}
				console.log("invalid email");
				res.send(error);	                //invalid email
			}
			else if(response.Password!==req.body.Password)  //compare customer password to database password 
			{
				let error={err:false}
				console.log("invalid password");
				res.send(error);		        //invalid password
				
			}
			else
			{
				let payload={subject:response._id};
				let token=jwt.sign(payload,'secretKey');
				let data={err:true,token_key:token,name:response.Name,email: response.Email, contact:response.Contact, dob: response.Dob, address:response.Address };

				console.log(data);
				res.status(200).send(data);
			}
		}

    })
});

//POST METHOD FOR REGISTRATION
app.post('/register', (req, res) => {
    console.log(req.body);

    //findOne will search whether requested email already exist or not
    Registration.findOne({ Email: req.body.Email }, function(err, response) {
                       if (err) {
                               console.log(err);                   //If cannot find email
                        }
                       if (response) {
                               console.log("User already exist!"); //if email already exist show message user already exist
	                       let error={err:false}
	                       res.send(error);
			}
	    
	//If input email not exist then it will register the user 	
	              else {
                              console.log("Welcome to Registration !!");
                              var register = new Registration(); //Create object of Registration Model
                              register.Name = req.body.Name;
                              register.Gender = req.body.Gender;
                              register.Contact = req.body.Contact;
            		      register.Dob = req.body.Dob;
            		      register.Account = req.body.Account;
            		      register.Address = req.body.Address;
            		      register.Email = req.body.Email;
                	      register.Password = req.body.Password;
			      //Save Register Object to Database
           		      register.save((err, registeredUser) =>  
	                         {
                                    if (!err) 
			               { 
				          let payload={subject:registeredUser._id};
				          let token=jwt.sign(payload,'secretKey');
					  let data={err:true,token_key:token,name:req.body.Name,email: req.body.Email, contact:req.body.Contact, dob: req.body.Dob, address:req.body.Address };
				          console.log(data);
					  res.status(200).send(data);
			               } 
		                   else 
			               { 
				          res.send(false); 
			               }
            });
        }
   });

});

app.listen(process.env.PORT||3000);  //Server listen on PORT 3000
