
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var School = require('./school.js');
var Board = require('./board.js');
var Profile = require('./profile.js');
var SALT_FACTOR = 8;

var alarmSchema = mongoose.Schema({
	kind: String, //board인지 profile인지
	what: String, //추천했는지, 비추천했는지, 댓글을 달았는지 
	targetId: mongoose.Schema.Types.ObjectId, //board 혹은 profile의 id
	unread: {type: Boolean, default: true}, //알람을 읽었는지
	title: String,
	updated_at : {type: Date, default: Date.now},
});

var userSchema = mongoose.Schema({
	name: String,
	anonym: String,
	email: String,
	password: String,
	kakaoEmail: String,
	graduation: String,
	up: {type: Number, default: 0},
	down: {type: Number, default: 0},
	profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
	schools: [{type: mongoose.Schema.Types.ObjectId, ref: 'School'}],
	boards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Board'}],
	alarms : { type: [alarmSchema] , default: [] },
	updated_at: {type: Date, default: Date.now },
});


//user저장시에, password를 hash해서, 암호화한 후 저장.
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
};

//user저장시에, password가 맞는지 확인.
userSchema.methods.validatePassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAnonym = function(){
	return bcrypt.hashSync(this.kakaoEmail, bcrypt.genSaltSync(SALT_FACTOR), null).substring(20, 28);
};


//user에 등록된 학교를 가지고, 15개의 뉴스피드를 가져온다. //콜백함수 (function(err, posts){})를 받는다.
userSchema.methods.getNewsFeed = function(cb){
	if(this.schools && Array.isArray(this.schools)){ //나중에 skip을 활용해서 보여줄수도 있을듯.
		this.model('Board').find().in('school', this.schools).sort({'updated_at': -1}).limit(30).populate('school').exec(cb);
	}
};
//관리자 익명 랜덤하게 생성.
userSchema.methods.generateRandomAnonym = function(){
	var returnAnonym = "";
	//hashed는 60length의 string
	var hashed = bcrypt.hashSync(this.kakaoEmail, bcrypt.genSaltSync(SALT_FACTOR), null)
	
	for(var a=0; a<4; a++){ //0~50 사이의 랜덤한 수를 발생시키고 두개씩 가져와 더한다.
		var randomInt = Math.floor(Math.random() * (50));
		returnAnonym += hashed.substring(randomInt , randomInt+2); 
	}
	//완성된 8글자의 randomAnonym을 리턴!
	return returnAnonym;
};

var User = mongoose.model('User', userSchema);
module.exports = User;

