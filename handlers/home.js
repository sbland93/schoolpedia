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
					return res.render('home/newsFeed', {
						posts: posts,
					});
				});	
			}else{ //로그인이 되어있지 않다면
				res.render('home/login',{});
			}
		},
		//사용자 관리 페이지 라우팅.
		myControll: function(req,res,next){
			User.findById(req.user._id).populate('boards').populate('schools').exec(function(err,user){
				if (err) return next(err);
				res.render('home/myControll',{
					user : userViewModel(user),
				});
			});
		},
		//로그인 후 메인페이지 라우팅.
		newsFeed:function(req,res,next){
			var limitNum = 30;
			var p1 = new Promise(function(resolve, reject){
				Profile.find({}).sort({updated_at:'-1'}).limit(limitNum).populate('schools.school').exec(function(err, profiles){
					if(err) reject(err);
					resolve(profiles);
				})
			});
			var p2 = new Promise(function(resolve, reject){
				req.user.getNewsFeed(function(err, posts){
					if(err) reject(err);
					resolve(posts);
				});
			});

			Promise.all([p1, p2]).then(function(rtnArr){
				res.render('home/newsFeed',{
					profileList: rtnArr[0].map(profileViewModel),
					posts: rtnArr[1].map(boardViewModel),
				}).catch(function(err){ next(err); });
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