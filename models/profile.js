var mongoose = require('mongoose');
var School = require('./school.js');

var storySchema = mongoose.Schema({
	//user: String,
	content: String,
	up: { type: Number, default: 0},
	down: { type: Number, default: 0},
	updated_at: { type: Date, default: Date.now },
});

//replySchema의 subdocument.
var replySchema = mongoose.Schema({
	user: String,
	content: String,
});

//DOLATER validate array
var schoolSchema = mongoose.Schema({
	school: {type: mongoose.Schema.Types.ObjectId, ref: 'School', index: true},
	class: {type: [Number], index: true}
})


//school의 reference.
//DOLATER school required 함.
var profileSchema = mongoose.Schema({
	schools : [schoolSchema],
	name: String,
	age: Number,
	gender: Boolean,
	description: String,
	stories: [ storySchema ],
	replies : [ replySchema ],
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	updated_at: {type: Date, default: Date.now },
});


function arrayLimit(number){
	return function(val){
		return val.length <= number;
	}
}

var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;