var mongoose = require('mongoose');
var School = require('./school.js');
var User = require('./user.js')

//특징 Schema
var featureSchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	content: String,
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	participants: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: []}, //추천, 반대 누른 유저(중복방지용)
	updated_at: { type: Date, default: Date.now },
});

//썰 Schema
var storySchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	content: String,
	up: { type: Number, default: 0},
	down: { type: Number, default: 0},
	participants: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: []}, //추천, 반대 누른 유저(중복방지용)
	updated_at: { type: Date, default: Date.now },
});

//방명록 Schema.
var replySchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	content: String,
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	participants: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: []}, //추천, 반대 누른 유저(중복방지용)
	updated_at: { type: Date, default: Date.now },
});

//DOLATER validate array
var schoolSchema = mongoose.Schema({
	school: {type: mongoose.Schema.Types.ObjectId, ref: 'School', index: true},
	class: {type: [Number], index: true}
});


//school의 reference.
//DOLATER school required 함.
var profileSchema = mongoose.Schema({
	schools : [ schoolSchema ],
	name: String,
	birth: { type: Number, min: 000000, max: 999999 },
	graduation: { type: Number, min: 1900, max: 2050 },
	gender: Boolean,
	description: String,
	features: [ featureSchema ],
	stories: [ storySchema ],
	replies : [ replySchema ],
	updated_at: {type: Date, default: Date.now },
});




var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;