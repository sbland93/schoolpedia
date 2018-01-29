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

		signUp : passport.authenticate('local', {
			failureRedirect: '/register',
		}),

		afterSignUp : function(req, res, next){
			res.locals.isLoggedIn = true;
			req.session.flash = {
				message: "success Sign up!"
			};
			res.locals.flash = {
				message: "Success Sign Up!",
			};
			res.json({success: true});
		},

		isLoggedIn : function (req, res, next){
			console.log("Test is Logged In", req.isAuthenticated);
			if(req.isAuthenticated()){
				return next();
			} else {
				res.redirect('/login');
			}
		}	


	}
}