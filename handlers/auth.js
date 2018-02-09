var passport = require('passport');
var userViewModel = require('../viewModels/user.js');

module.exports = function(){
	return {
	
		// '/login' Page Routing.
		login: function(req, res, next){
			res.render('login',{});
		},
		
		// '/register' Page Routing.
		register: function(req, res, next){
			res.render('register',{});
		},

		localSignup : passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/register',
		}),

		localLogin : passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
		}),

		logout : function(req, res, next){
			req.logout();
			res.redirect("/");
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


		ajaxAuth : function(req, res, next){
			if(req.isAuthenticated()){
				return res.json({isLoggedIn: true, userInfo : userViewModel(req.user)});
			} else {
				return res.json({isLoggedIn: false});
			}
		}


	}
}