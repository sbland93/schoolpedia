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
	alarmUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], //알람을 위해 넣어두는 alarmUserList.
});



//board가 Update될 때, 알람유저에 있는 유저들에게 알람을 보낸 후, 알람 리스트에 있는 유저에 update하는 참여자도 넣어준다.
boardSchema.post('update', function(next) {
	var self = this;
	//댓글이 쓰이면 alarmUser들에게 회원님이 ~한 글에 ~님이 글을 좋아합니다를 알람에 넣어준다.
	var updateObj = self.getUpdate();
	var what = false; var userId = false; // 일단 false로 두고, replies, up, down 중하나이면 값을 넣을것이므로 후에 체크한다.
	var promiseArr = [];
	console.log(self.getUpdate());
	if(!updateObj.$push && !updateObj.$inc) return;
	if(updateObj.$push.replies){ //댓글, up, down 에 따라서 what과 user의 flag를 채워준다.
		what = "reply";
		userId = updateObj.$push.replies.user;
	}else if(updateObj.$inc.up){
		what = "up";
		userId = updateObj.$push.participants
	}else if(updateObj.$inc.down){
		what = "down";
		userId = updateObj.$push.participants;
	}else{ return; } 
	console.log("self:", self);

	if(what !== false && userId !== false){ //댓글, up, down중에 하나라면 채워져있을 것이다.
		var boardId = self._conditions._id;
		Board.findById(boardId, function(err, board){ //update Hook에서 document에 접근할 방법이 없으므로, 다시한번 찾는다.(개선여지)
			if(!board.alarmUsers) return;
			var alarmUpdateObj = {"$push": { alarms : { $each: [{kind:"board", what: what, targetId: boardId, title: board.title}], $sort : { updated_at: -1 } }}};
			board.alarmUsers.map(function(user){ //현재 update하는 board에 있는 user들에게 alarm을 보낸다.
				if(user.equals(userId)) return; //본인한테는 알람을 보낼 필요 없으므로 이렇게 넣어둔다. 
				promiseArr.push(new Promise(function(resolve, reject){
					User.findByIdAndUpdate(user, alarmUpdateObj, function(err){
						if(err) return reject(err);
						return resolve();
					});
				}));
			});
			Promise.all(promiseArr).then(function(rtnArr){ //user 들에게 모두 알람을 보냈다면,
				var didPush = board.alarmUsers.pushIfNotExist(userId); //알람 유저에 없었다면 추가하고, 저장한다.
				if(didPush) { //push를 했다면
					board.save(function(err){
						if(err) console.log(err);
						console.log("Save!");
					});
				} else { //안했다면 저장할 필요 없다.
					return;
				}
			});
		});
	}

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