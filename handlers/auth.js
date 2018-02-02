var passport = require('passport');

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
			if(req.isAuthenticated()){
				return next();
			} else {
				res.json({success: false, type:"Login"});
			}
		} 


	}
}