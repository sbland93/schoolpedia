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
	school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' , index: true},
	title: String,
	content: String,
	replies: [ replySchema ],
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	updated_at: { type: Date, default: Date.now },
});


var Board = mongoose.model('Board', boardSchema);
module.exports = Board;