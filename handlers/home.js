var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
var Info = require('../models/info.js');
var User = require('../models/user.js');
var schoolViewModel = require('../viewModels/school.js');
var boardViewModel = require('../viewModels/board.js');
var profileViewModel = require('../viewModels/profile.js');
var infoViewModel = require('../viewModels/info.js');
var userViewModel = require('../viewModels/user.js');
var Passport = require('passport');
var Auth = require('./auth.js');
module.exports = function(){


	return {

		//기본 홈 페이지는 로그인이 된 상태라면, newsFeed이고 로그인이 되어있지 않은 상태라면 login페이지를 보여준다.
		home:  function(req, res, next){
			if(req.isAuthenticated()){ //로그인이 되어있는 상태라면 뉴스피드를 보여준다.
				req.user.getNewsFeed(function(err, posts){
					if(err) return next(err);
					return res.render('newsFeed', {
						posts: posts,
					});
				});	
			}else{ //로그인이 되어있지 않다면
				res.render('login',{});
			}
		},
		//사용자 관리 페이지 라우팅.
		myControll: function(req,res,next){
			User.findById(req.user._id).populate('boards').populate('schools').exec(function(err,user){
				if (err) return next(err);
				res.render('myControll',{
					user : userViewModel(user),
				});
			});
		},
		//로그인 후 메인페이지 라우팅.
		newsFeed:function(req,res,next){
			req.user.getNewsFeed(function(err, posts){
				if(err) return next(err);
				return res.render('newsFeed', {
					posts: posts,
				});
			});
		},
		clientTest: function(req, res){
			res.render('test', {
				pageTestScript: '/qa/tests-clientAPI.js',
				showTests: true,
				testAPI: true,
			});
		},

	}
	
}