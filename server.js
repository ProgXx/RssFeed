//Require dependencis to be used in project.
var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
var morgan = require("morgan");
var config = require('./config');
var mongoose = require("mongoose");


var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

//Connect to the mongoose database.
mongoose.connect(config.database,function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Connected to database");
	}
});

//Define the middleware 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//Create a route for http://localhost:3000/api
var api = require('./app/routes/api')(app,express,io);
app.use('/api',api); // /api prefix for all the api

//Any other route will be redirected to the index.html
app.get('*',function(req,res){
	res.sendFile(__dirname + '/public/app/views/index.html');
})

//Start the server.
http.listen(config.port,function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Listening to port 3000");
	}
})
