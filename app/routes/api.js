var User = require('../models/user');
var Feed = require('../models/feed');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
	var token = jsonwebtoken.sign({
		id : user._id,
		name : user.name,
		username : user.username
	},secretKey,{
		expiresInMinute: 1440
	});
	return token;
}

module.exports = function(app,express,io){
	var api = express.Router();

	api.get('/all_feeds', function(req,res){
		Feed.find({},function(err,feeds){
			if(err){
				res.send(err);
				return;
			}
			res.json(feeds);
		});
	});

	api.post('/signup',function(req,res){
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		var token = createToken(user);

		user.save(function(err){
			if(err){
				res.send(err);
				return;
			}
			res.json({
				success: true,
				message:'User has been created',
				token: token
			});
		});
	});


	api.get('/users',function(req,res){
		User.find({},function(err,users){
			if(err){
				res.send(err);
				return;
			}
			res.json(users);
		});
	});

	api.post('/login',function(req,res){
		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err,user){
			if(err) throw err;
			if(!user){
				res.send({message: "User doesn't exists"});
			} else if(user){
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.send({message:"Invalid Password"});
				}else{
					////// token
					var token = createToken(user);
					res.json({
						success: true,
						message: "Successfully logged in",
						token: token
					});
				}
			}
		});
	});

	api.use(function(req,res,next){
		console.log("Somebody just came to our app!");
		var token  = req.body.token || req.param('token') ||req.headers['x-access-token'];

		//check if token exists
		if(token){
			jsonwebtoken.verify(token,secretKey,function(err,decoded){
				if(err){
					res.status(404).send({success:false,message:"Failed to execute"});
				}else{
					req.decoded = decoded;
					next();
				}
			});
		}else{
			res.status(403).send({success:false,message:"No token parameter"});
		}
	});


	// Destination B :: Provide Legitimate Token

	api.route('/')
		.post(function(req,res){
			console.log(req.body);
			console.log(req.decoded.id," ",req.body.content);
			var feed = new Feed({
				creator: req.decoded.id,
				content: req.body.content,
			});
			feed.save(function(err,newFeed){
				if(err){
					res.send(err);
					return;
				}
				console.log(newFeed);
				io.emit('feed',newFeed);
				res.json({message:'New Feed created'});
			});
		})

		.get(function(req,res){
			Feed.find({creator: req.decoded.id},function(err,feeds){
				if(err){
					res.send(err);
					return;
				}
				console.log(feeds);
				res.json(feeds);
			});
		});

	api.get('/me',function(req,res){
		res.json(req.decoded);
	});

	return api;
};
