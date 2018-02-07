var mongoose = require('mongoose');
var Board = require('./board.js');
var Profile = require('./profile.js');

var schoolSchema = mongoose.Schema({
	name: String,
	location: String,
	description: String,
	category: { type: String, enum: ['elementarySchool', 'middleSchool', 'highSchool'] },
	available: { type: Boolean, default: false },
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	updated_at: {type: Date, default: Date.now },
});


//SchoolId를 이용해 Profile들을 가져온는 method.
schoolSchema.methods.getProfiles = function(sortOptions, limitNumber, cb){
	Profile.find({"schools.school": this._id}).sort(sortOptions)
		.limit(limitNumber).populate('schools.school').exec(cb);
};

//SchoolId를 이용해 Board들을 가져온는 method.
schoolSchema.methods.getBoards = function(sortOptions, limitNumber, cb){
	Board.find({school : this._id}).sort(sortOptions)
	.limit(limitNumber).populate('school').exec(cb);
};


//학교 소개글은 다섯글자여야 한다.
schoolSchema.path('description').validate(function(v) {
	return v.length === 5;
}, 'School description length should be 5');


var School = mongoose.model('School', schoolSchema);
module.exports = School;