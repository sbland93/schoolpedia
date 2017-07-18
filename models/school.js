var mongoose = require('mongoose');
var Board = require('./board.js');
var Profile = require('./profile.js');

var schoolSchema = mongoose.Schema({
	name: String,
	location: String,
	category: { type: String, enum: ['elementarySchool', 'middleSchool', 'highSchool'] },
	available: { type: Boolean, default: false },
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	updated_at: {type: Date, default: Date.now },
});


//SchoolId를 이용해 Profile들을 가져온는 method.
schoolSchema.methods.getProfiles = function(sortOptions, limitNumber, cb){
	switch(this.category){
		case 'highSchool' :
			var query = {highSchool: this._id};
			break;
		case 'middleSchool' :
			var query = {middleSchool: this._id};
			break;
		case 'elementarySchool' :
			var query = {elementarySchool: this._id};
			break;
	};
	Profile.find(query).sort(sortOptions)
		.limit(limitNumber).populate('highSchool middleSchool elementarySchool').exec(cb);
};

//SchoolId를 이용해 Board들을 가져온는 method.
schoolSchema.methods.getBoards = function(sortOptions, limitNumber, cb){
	Board.find({school : this._id}).sort(sortOptions)
	.limit(limitNumber).populate('school').exec(cb);
};


var School = mongoose.model('School', schoolSchema);
module.exports = School;