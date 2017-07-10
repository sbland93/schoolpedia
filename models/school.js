var mongoose = require('mongoose');
var Board = require('./board.js');
var Profile = require('./profile.js');

var schoolSchema = mongoose.Schema({
	name: String,
	location: String,
	category: { type: String, enum: ['초등학교', '중학교', '고등학교'] },
	available: { type: Boolean, default: false },
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	updated_at: {type: Date, default: Date.now },
});

var School = mongoose.model('School', schoolSchema);
module.exports = School;