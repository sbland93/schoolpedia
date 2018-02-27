var mongoose = require('mongoose');
var School = require('./school.js');
var User = require('./user.js');


//replySchema의 subdocument를 둔다.
var replySchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	content: String,
	updated_at : { type: Date, default: Date.now },
});

//School의 reference두기.
var boardSchema = mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //글 작성자
	writer: String, //글 작성자
	school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' , index: true}, //학교게시물
	title: String, //제목
	content: String, //내용
	replies: [ replySchema ], //댓글
	up: { type: Number, default: 0 }, //추천
	down: { type: Number, default: 0 }, //반대
	participants: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: []}, //추천, 반대 누른 유저(중복방지용)
	updated_at: { type: Date, default: Date.now }, //글의 생성시기
});


//userId를 받아서, writer와 같은지 확인해준다.
boardSchema.methods.isWriter = function(userId){
	if(!this.owner) {	
		return false;	
	}
	return this.owner.equals(userId);
};

var Board = mongoose.model('Board', boardSchema);
module.exports = Board;