// Create Feed Database to store the url created by the user
// Can use this schema to retrieve the url previously entered by the user and retrieve the feeds.
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
	creator: {type: Schema.Types.ObjectId, ref: ' User'},
	content: String,
	created: {type: Date,defauly: Date.now}
});

module.exports = mongoose.model('Feed',FeedSchema);
