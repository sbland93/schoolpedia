
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var School = require('./school.js');
var Board = require('./board.js');
var Profile = require('./profile.js');


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
});


//user저장시에, password를 hash해서, 암호화한 후 저장.
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//user저장시에, password가 맞는지 확인.
userSchema.methods.validatePassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAnonym = function(){
	return bcrypt.hashSync(this.kakaoEmail, bcrypt.genSaltSync(8), null);
};


//user에 등록된 학교를 가지고, 15개의 뉴스피드를 가져온다. //콜백함수 (function(err, posts){})를 받는다.
userSchema.methods.getNewsFeed = function(cb){
	if(this.schools && Array.isArray(this.schools)){ //나중에 skip을 활용해서 보여줄수도 있을듯.
		this.model('Board').find().in('school', this.schools).sort({'updated_at': -1}).limit(30).populate('school').exec(cb);
	}
}


var User = mongoose.model('User', userSchema);
module.exports = User;

