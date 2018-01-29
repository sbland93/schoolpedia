var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

module.exports = function(passport){

	//serialize시킬때의 passport
	passport.serializeUser(function(user, done){
		done(null, user._id);
	});

	//deserialize시킬때 어떤 함수를 거칠지.
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	//passport 'local' Strategy.
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: true,
		passReqToCallback: true,
	},//done(에러인자, 성공시 user인자)
	function(req, email, password, done){
		//Email을 가지고, 유저를 찾기시작.		
		User.findOne({'email': email}, function(err, user){
			if(err) return done(err);
			if(user){
				if(user.validatePassword(password)){
					return done(null, user);
				}
			} else{
				//카카오이메일인증이 제대로 되지 않은경우 로그인은 실패한다.
				if(!req.body.kakaoEmail || !req.body.verified){
					//TODO
					return done("error");
				}
				var newUser = new User();
				newUser.name = req.body.name;
				newUser.email = email;
				newUser.password = newUser.generateHash(password);
				newUser.kakaoEmail = req.body.kakaoEmail;

				newUser.save(function(err){
					if(err) throw err;
					return done(null, newUser);
				});

			}
		});
	}
	));

};