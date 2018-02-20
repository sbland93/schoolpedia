var passport = require('passport');
var userViewModel = require('../viewModels/user.js');
var credentials = require('../credentials.js');

module.exports = function(){
	return {
	
		// '/login' Page Routing.
		login: function(req, res, next){
			if(req.query && req.query.redirect) req.session.returnTo = req.query.redirect;
			res.render('login',{});
		},
		
		// '/register' Page Routing.
		register: function(req, res, next){
			res.render('register',{});
		},

		localSignup : passport.authenticate('local', {
			successReturnToOrRedirect : '/newsFeed',
			failureRedirect: '/register',
		}),

		localLogin : passport.authenticate('local', {
			successReturnToOrRedirect: '/newsFeed',
			failureRedirect: '/login',
		}),

		logout : function(req, res, next){
			req.logout();
			res.redirect('/');
		},

		isLoggedIn : function (req, res, next){
			if(req.isAuthenticated()){
				return next();
			} else {
				res.redirect('/login');
			}
		},

		ajaxIsLoggedIn: function(req, res, next){
			if(req.isAuthenticated()){ // 로그인되어있는지 확인!
				return next();
			} else {
				res.json({success: false, type:"Login"});
			}
		} ,

		//Loggin 상태와, usrInfo를 담아 보내준다.
		ajaxAuth : function(req, res, next){
			console.log("req.url : ", req.url);
			if(req.isAuthenticated()){
				return res.json({success: true, isLoggedIn: true, userInfo : userViewModel(req.user), url: req.url});
			} else {
				return res.json({success: true, isLoggedIn: false, url: req.url});
			}
		},


		isAdmin : function(req, res, next){
			if(req.isAuthenticated()){
				if(req.user.kakaoEmail === credentials.adminUserInfo.kakaoEmail){ 
					return next();
				}else{
					res.status(404);
					return res.render('404');
				}
			} else {
				res.status(404);
				return res.render('404');
			}
		},


	}
}