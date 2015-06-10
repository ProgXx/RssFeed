// Define the configuration variables. 
//database - url to connect to the https://mongolab.com/
//port - port for the server
//secret key -  Any secret key to encrypt the password.
module.exports = {
	"database": "mongodb://admin:admin@ds043062.mongolab.com:43062/rssfeed",
	"port": process.env.PORT || 3000,
	"secretKey": "YourSecretKey"
}
