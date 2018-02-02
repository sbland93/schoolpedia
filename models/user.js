
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var School = require('./school.js');
var Board = require('./board.js');
var Profile = require('./profile.js');


var userSchema = mongoose.Schema({
	profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
	schools: [{type: mongoose.Schema.Types.ObjectId, ref: 'School'}],
	boards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Board'}],
	name: String,
	email: String,
	password: String,
	kakaoEmail: String,
});


//user저장시에, password를 hash해서, 암호화한 후 저장.
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//user저장시에, password가 맞는지 확인.
userSchema.methods.validatePassword = function(password){
	return bcrypt.compareSync(password, this.password);
}


var User = mongoose.model('User', userSchema);
module.exports = User;