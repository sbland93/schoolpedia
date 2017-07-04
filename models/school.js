var mongoose = require('mongoose');
var schoolSchema = mongoose.Schema({
	name: String,
	location: String,
	category: { type: String, enum: ['초등학교', '중학교', '고등학교'] },
	available: { type: Boolean, default: false }
});

var School = mongoose.model('School', schoolSchema);
module.exports = School;