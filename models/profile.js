var mongoose = require('mongoose');
var School = require('./school.js');

//replySchema의 subdocument.
var replySchema = mongoose.Schema({
	user: String,
	content: String,
});

//school의 reference.
var profileSchema = mongoose.Schema({
	school:[{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }],
	class: [{type: Number, min:100, max: 320}],
	name: String,
	age: Number,
	gender: Boolean,
	description: String,
	replies : [replySchema],
});

var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;