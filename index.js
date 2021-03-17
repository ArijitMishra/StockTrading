const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Registration = require("./model");
var crypto = require('crypto');
var cors = require('cors');
const jwt=require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());



app.get('*', (req, res) => {
    res.send("NodeJs 404 not found");
});


app.post('/login', (req, res) => {
    console.log(req.body);
    


    Registration.findOne({ Email: req.body.Email }, function(err, response) {
        if (err) {
            console.log(err);
        }
        else{
			if(!response)
			{
				let error={err:false}
				console.log("invalid email");
				res.send(error);	//invalid email
			}
			else if(response.Password!==req.body.Password)
			{
				let error={err:false}
				console.log("invalid password");
				res.send(error);		//invalid password
				
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


app.post('/register', (req, res) => {
    console.log(req.body);


    Registration.findOne({ Email: req.body.Email }, function(err, response) {
        if (err) {
            console.log(err);
        }
        if (response) {
            console.log("User already exist!");
			let error={err:false}
			res.send(error);
			

        } 
		else {
            console.log("Welcome to Registration !!");
            var register = new Registration();
            register.Name = req.body.Name;
            register.Gender = req.body.Gender;
            register.Contact = req.body.Contact;
            register.Dob = req.body.Dob;
            register.Account = req.body.Account;
            register.Address = req.body.Address;
            register.Email = req.body.Email;
            register.Password = req.body.Password;
            register.save((err, registeredUser) => 
			{
                if (!err) 
				{ 
						let payload={subject:registeredUser._id};
						let token=jwt.sign(payload,'secretKey');
						let data={err:true,token_key:token,name:req.body.Name,email: req.body.Email, contact:req.body.Contact, dob: req.body.Dob, address:req.body.Address };
						console.log(data);
						res.status(200).send(data);
				} else 
				{ 
						res.send(false); 
				}
            });
        }
    });

});

app.listen(process.env.PORT||3000);