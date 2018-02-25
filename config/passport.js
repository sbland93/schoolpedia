var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

module.exports = function(passport){

	//serialize시킬때의 passport
	passport.serializeUser(function(user, done){
		done(null, user._id);
	});

	//deserialize시킬때 어떤 함수를 거칠지.
	passport.deserializeUser(function(id, done){
		User.findById(id).populate('schools').exec(function(err, user){
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
		console.log(req.body);
		console.log("HERE!!!!!!");		
		User.findOne({'email': email}, function(err, user){
			if(err) return done(err);
			if(user){
				//로그인 중이면서, 유저가 있고, 비밀번호가 맞다면 로그인 시킨다.
				if(req.body.login){
					if(user.validatePassword(password)) return done(null, user);
					else{ //로그인 중이면서, 비밀번호가 틀리다면
						req.session.flash = {
							type: "info",
							intro: "알림: ",
							message: "비밀번호가 틀립니다.",
						};
						return done(null, false);
					}
				
				}else if(req.body.register){ //회원가입 중에, 유저가 이미 있다면
					req.session.flash = {
						type: "warning",
						intro: "중복알림: ",
						message: "아이디(이메일) 중복입니다."
					};
					return done(null, false);
				}else return done(null, false);

				
			} else{ //유저가 없고 로그인중이라면
				if(req.body.login){
					req.session.flash = {
						type: "info",
						intro: "알림: ",
						message: "등록된 이메일이 아닙니다."
					};
					return done(null, false);
				}
				else if(req.body.register){ //회원가입중이고, 이메일 중복이 아니라면
					//카카오이메일인증이 제대로 되지 않은경우 로그인은 실패한다.
					if(!req.body.kakaoEmail || !req.body.verified){
						return done("error");
					}
					var newUser = new User();
					//학교가 하나 들어오면 배열로 오지 않기때문에 하나 보냈다면 배열로 만들어 넣어준다.
					if(req.body.schools!==undefined && !(Array.isArray(req.body.schools))){
						var schoolArray = [];
						schoolArray[0]=req.body.schools;
						newUser.schools = schoolArray;
					}
					else{
						newUser.schools = req.body.schools;
					}
					newUser.name = req.body.name;
					newUser.email = email;
					newUser.password = newUser.generateHash(password);
					newUser.kakaoEmail = req.body.kakaoEmail;
					newUser.anonym = newUser.generateAnonym(req.body.kakaoEmail);
					newUser.graduation = req.body.graduation;
					newUser.save(function(err){
						if(err) throw err;
						return done(null, newUser);
					});
				}else return done(null, false);
			}
		});
	}
	));


};