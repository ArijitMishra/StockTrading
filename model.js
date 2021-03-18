const mongoose = require('mongoose');  //importing mongoose module
require("dotenv/config");   //importing .env file

//Connection to MongoDB Atlas thorugh Connection String
mongoose.connect(process.env.DB_CONNECTION_STRING, {
			useCreateIndex:true,
			useNewUrlParser:true,
			useUnifiedTopology:true
		}).then(()=>{
		console.log("Success of connection!!"); //If Connection to MongoDB Atlas is Successful
		}).catch((e)=>{
		console.log("Connection Failed!!"); //If Connection failed shows error 
		});
		
//Schema for the mongoose connection
var registerSchema = mongoose.Schema({
		Name: String,
		Gender: String,
		Contact: Number,
		Dob:String,
		Account:String,
		Address:String,
		Email:{   
			type:String,
			unique:true
		},
		Password:String
	});
 
var Registration = mongoose.model("Registration", registerSchema); //Creating Model with our Schema and giving name Registration to it
module.exports = Registration; //Exporting Model 
