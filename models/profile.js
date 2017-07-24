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

//school의 reference.
//DOLATER school required 함.
var profileSchema = mongoose.Schema({
	highSchool : { type: mongoose.Schema.Types.ObjectId, ref: 'School' , index: true},
	middleSchool: { type: mongoose.Schema.Types.ObjectId, ref: 'School', index: true },
	elementarySchool: { type: mongoose.Schema.Types.ObjectId, ref: 'School', index: true },
	highClass: {
		type: 
	    [{
			type: Number,
			min: 100,
			max: 325,
	    }],
	    validate: [arrayLimit(3), '{PATH} exceeds the limit of 3'],
	    default: [100, 200, 300],
	},
  	middleClass : {
	    type: 
	    [{
			type: Number,
			min: 100,
			max: 325,
	    }],
	    validate: [arrayLimit(3), '{PATH} exceeds the limit of 3'],
	    default: [100, 200, 300],
  	},
  	elementaryClass : {
	    type: 
	    [{
			type: Number,
			min: 100,
			max: 625,
	    }],
	    validate: [arrayLimit(6), '{PATH} exceeds the limit of 6'],
	    default: [100, 200, 300, 400, 500, 600],
  	},
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