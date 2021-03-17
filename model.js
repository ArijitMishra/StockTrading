const mongoose = require('mongoose');
require("dotenv/config");
			mongoose.connect(process.env.DB_CONNECTION_STRING, {
				useCreateIndex:true,
				useNewUrlParser:true,
				useUnifiedTopology:true
			}).then(()=>{
			console.log("Success of connection!!");
			}).catch((e)=>{
			console.log("Connection Failed!!");
			});
		
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
 
var Registration = mongoose.model("Registration", registerSchema);
module.exports = Registration;