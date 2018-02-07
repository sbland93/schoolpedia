var mongoose = require('mongoose');
var School = require('./school.js');
var User = require('./user.js')

//특징 Schema
var featureSchema = mongoose.Schema({
	feature: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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



profileSchema.path('bugName').validate(function (v) {
    return v.length == 2;
}, 'The bugName should be length of 2');


//profile의 content를 찾아 participants에 이미 있는지 확인하고, 없다면 저장하고 있다면 Already를 리턴한다.
profileSchema.methods.verifiedUpDown = function(target, targetId, userId, upOrDown, cb){
	var returnValue; //성공했는지, 실패했는지
	var self = this;
	return new Promise(function(resolve, reject){
		if(self[target] || self[target].length){
			self[target].map(function(realTarget){ //el가 features중 하나의 객체를 가리킨다.
				if(realTarget._id == targetId){ //target의 배열중에 정확히 targetId를 찾아 (못찾을가능성은 없지만, 그래도 처리해야한다 TODO),
					if(realTarget.participants || realTarget.participants.length){
						var isAlready = realTarget.participants.some(function(_el){
							return _el == userId;
						})
						if(isAlready){
							reject({success: false, type: "Already"});
						}else{ //participants에 없다면, participants에 넣고 UP/DOWN 시키고 저장한다.
							realTarget.participants.unshift(userId);
							if(upOrDown === "up") realTarget.up += 1;
							else if(upOrDown === "down") realTarget.down -= 1;
							else reject("Some Error Occur");
							self.save(function(err){
								if(err) return reject({success: false, type: "Others"});
								resolve({success: true});
							});
						}				
					}
				}
			});
		}	
	})	
};

var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;