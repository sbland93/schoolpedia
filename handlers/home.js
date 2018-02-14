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

		//home 페이지 라우팅. //공지사항관련 !
		home:  function(req, res, next){
			Info.find(function(err,infos){
				if(err) next(err);
				res.render('home', {
					infoList: infos.map(infoViewModel),
					pageTestScript: '/qa/tests-home.js',
				});
			});
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