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

		//home 페이지 라우팅.
		//available(true)인 학교들의 리스트들을 반환.
		home:  function(req, res, next){
			School.find({available: true}).sort({updated_at : '-1'})
			.exec(function(err, schools){
				if(err) next(err);
				Info.find(function(err,infos){
					if(err) next(err);
					res.render('home', {
						schoolList : schools.map(schoolViewModel),
						pageTestScript: '/qa/tests-home.js',
						infoList: infos.map(infoViewModel),
					});
 				})
				
			});
		},
		//사용자 관리 페이지 라우팅.
		myControll: function(req,res,next){
			User.findById(req.user._id).populate('boards').exec(function(err,user){
				if (err) return next(err);
				res.render('myControll',{
					user : userViewModel(user),
				});
			});
		},

		newsFeed:function(req,res,next){
			req.user.getNewsFeed(function(err, posts){
				if(err) return next(err);
				return res.render('newsFeed', {
					posts: posts,
				});
			});
			/*User.findById(req.user._id).exec(function(err,user){
				console.log("here");
				if(err) return next(err);
				if(!user) return next("No User");
				user.getNewsFeed(function(err, posts){
					if(err) return next(err);
					return res.render('newsFeed',{
						userInfo : user,
						posts : posts,
					});
				});
			});*/	
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