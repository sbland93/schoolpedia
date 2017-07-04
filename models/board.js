var mongoose = require('mongoose');
var School = require('./school.js');


//replySchema의 subdocument를 둔다.
var replySchema = mongoose.Schema({
	user: String,
	content: String,
});

//School의 reference두기.
var boardSchema = mongoose.Schema({
	user: String,
	school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
	title: String,
	content: String,
	updated: { type: Date, default: Date.now },
	replies: [ replySchema ],
});


var Board = mongoose.model('Board', boardSchema);
module.exports = Board;