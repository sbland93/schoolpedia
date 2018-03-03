var mongoose = require('mongoose');
var School = require('./school.js');
var User = require('./user.js')

//특징 Schema
var featureSchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	content: String,
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	participants: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: []}, //추천, 반대 누른 유저(중복방지용)
	updated_at: { type: Date, default: Date.now },
});

//썰 Schema
var storySchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	content: String,
	up: { type: Number, default: 0},
	down: { type: Number, default: 0},
	participants: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: []}, //추천, 반대 누른 유저(중복방지용)
	updated_at: { type: Date, default: Date.now },
});

//방명록 Schema.
var replySchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	content: String,
	up: { type: Number, default: 0 },
	down: { type: Number, default: 0 },
	participants: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: []}, //추천, 반대 누른 유저(중복방지용)
	updated_at: { type: Date, default: Date.now },
});

//DOLATER validate array
var schoolSchema = mongoose.Schema({
	school: {type: mongoose.Schema.Types.ObjectId, ref: 'School', index: true},
	class: {type: [Number], index: true}
});


//school의 reference.
//DOLATER school required 함.
var profileSchema = mongoose.Schema({
	writer: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	schools : [ schoolSchema ],
	name: String,
	birth: { type: Number, min: 000000, max: 999999 },
	graduation: { type: Number, min: 1900, max: 2050 },
	gender: Boolean,
	description: String,
	features: [ featureSchema ],
	stories: [ storySchema ],
	replies : [ replySchema ],
	updated_at: {type: Date, default: Date.now },
	alarmUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], //알림을 위해 추가해두는 userList
});


//프로필을 생성한 writer를 alarm을 받을 User에 넣어준다.
//profile이 Update될 때, 알람유저에 있는 유저들에게 알람을 보낸 후, 알람 리스트에 있는 유저에 update하는 참여자도 넣어준다.
profileSchema.post('findOneAndUpdate', function(next) {
	var self = this;
	//댓글이 쓰이면 alarmUser들에게 회원님이 ~한 글에 ~님이 글을 좋아합니다를 알람에 넣어준다.
	var updateObj = self.getUpdate();
	var what = false; var userId = false; // 일단 false로 두고, replies, up, down 중하나이면 값을 넣을것이므로 후에 체크한다.
	if(!updateObj.$push) return;

	if(updateObj.$push.features){ //댓글, up, down 에 따라서 what과 user의 flag를 채워준다.
		what = "feature";
		userId = updateObj.$push.features.$each[0].user;
	}else if(updateObj.$push.stories){
		what = "story";
		userId = updateObj.$push.stories.$each[0].user;
	}else if(updateObj.$push.replies){
		what = "reply";
		userId = updateObj.$push.replies.$each[0].user;
	}else{ return; } 

	console.log("self:", self);
	var promiseArr = [];
	if(what !== false && userId !== false){ //댓글, up, down중에 하나라면 채워져있을 것이다.
		var profileId = self._conditions._id;
		Profile.findById(profileId, function(err, profile){ //update Hook에서 document에 접근할 방법이 없으므로, 다시한번 찾는다.(개선여지)
			if(!profile.alarmUsers) return;
			var alarmUpdateObj = {"$push": { alarms : { $each: [{kind:"profile", what: what, targetId: profileId, title: profile.title}], $sort : { updated_at: -1 } }}};
			profile.alarmUsers.map(function(user){ //현재 update하는 profile에 있는 user들에게 alarm을 보낸다.
				if(user.equals(userId)) return; //본인한테는 알람을 보낼 필요 없으므로 이렇게 넣어둔다. 
				promiseArr.push(new Promise(function(resolve, reject){
					User.findByIdAndUpdate(user, alarmUpdateObj, function(err){
						if(err) return reject(err);
						return resolve();
					});
				}));
				console.log("알람유저는 있다.");
			});
			Promise.all(promiseArr).then(function(rtnArr){ //user 들에게 모두 알람을 보냈다면,
				var didPush = profile.alarmUsers.pushIfNotExist(userId); //알람 유저에 없었다면 추가하고, 저장한다.
				if(didPush) { //push를 했다면
					profile.save(function(err){
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


var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;