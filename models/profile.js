var mongoose = require('mongoose');
var School = require('./school.js');

//replySchema의 subdocument.
var replySchema = mongoose.Schema({
	user: String,
	content: String,
});

//school의 reference.
//DOLATER school required 함.
var profileSchema = mongoose.Schema({
	highSchool : { type: mongoose.Schema.Types.ObjectId, ref: 'School' , index: true},
	middleSchool: { type: mongoose.Schema.Types.ObjectId, ref: 'School', index: true },
	elementarySchool: { type: mongoose.Schema.Types.ObjectId, ref: 'School', index: true },
	firstClass: Number,
	secondClass: Number,
	thirdClass: Number,
	name: String,
	age: Number,
	gender: Boolean,
	description: String,
	replies : [replySchema],
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	updated_at: {type: Date, default: Date.now },
});

var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;