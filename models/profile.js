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
});

var featureSchema = mongoose.Schema({
	feature: String,
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	updated_at: { type: Date, default: Date.now },
})

//school의 reference.
//DOLATER school required 함.
var profileSchema = mongoose.Schema({
	schools : [ schoolSchema ],
	bugName: { type: String, default: "벌레" },
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


function arrayLimit(number){
	return function(val){
		return val.length <= number;
	}
}

profileSchema.path('bugName').validate(function (v) {
    return v.length == 2;
}, 'The bugName should be length of 2');

var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;