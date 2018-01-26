
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
});


//user저장시에, password를 hash해서, 암호화한 후 저장.
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//user저장시에, password가 맞는지 확인.
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}


var User = mongoose.model('User', userSchema);
module.exports = User;