var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
var schoolViewModel = require('../viewModels/school.js');
var boardViewModel = require('../viewModels/board.js');
var profileViewModel = require('../viewModels/profile.js');



module.exports = function(){


	return {

		//home 페이지 라우팅.
		//available(true)인 학교들의 리스트들을 반환.
		home:  function(req, res, next){
			School.find({available: true}).sort({updated_at : '-1'})
			.exec(function(err, schools){
				if(err) next(err);
				res.render('home', {
					schoolList : schools.map(schoolViewModel),
					pageTestScript: '/qa/tests-home.js'
				});
			});
		},

		//profile 페이지 라우팅
		profile: function(req, res, next){
			Profile.findById(req.params.id)
				.populate('highSchool middleSchool elementarySchol')
				.exec(function(err, profile){
				if(err) next(err);
				if(!profile){
					res.locals.message404 = '해당학생 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('profile', {
					profile: profileViewModel(profile),		
					pageTestScript: '/qa/tests-profile.js'
				});
			})
		},

		//board 페이지 라우팅
		board: function(req, res, next){
			Board.findById(req.params.id)
			.exec(function(err, board){
				if(err) next(err);
				if(!board){
					res.locals.message404 = '해당학교 글은 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('board', {
					board : boardViewModel(board),
					pageTestScript: '/qa/tests-board.js'
				});
			});
		},

		//:id에 해당하는 school의 Board, Profile을 5개씩 리턴한다.
		//DOLATER 학교글이 부족할경우.
		school: function(req, res, next){
			var schoolDocument;
			var profilePromise = new Promise(function(resolve, reject){
				School.findById(req.params.id, function(err, school){
					if(err) return reject(err);
					schoolDocument = school;
					if(!school){
						res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
						return next();
					}
					school.getProfiles({updated_at : '-1'},  5, function(err, profiles){
						if(err) reject(err);
						resolve(profiles);
					});
				});
			});
			var boardPromise = new Promise(function(resolve, reject){
				Board.find({school : req.params.id}).sort({updated_at : '-1'})
				.limit(5).populate('school').exec(function(err, boards){
					if(err) reject(err);
					resolve(boards);
				});
			});
			Promise.all([profilePromise, boardPromise]).then(function(rtnArr){
				res.render('school', {
					schoolInfo: schoolViewModel(schoolDocument),
					profileList : rtnArr[0],
					boardList : rtnArr[1],
				});
			}).catch(function(err){ return next(err); });
		},

		//:id에 해당하는 school의 Profile을 10개 Return한다.
		schoolProfiles: function(req, res, next){
			var schoolDocument;
			var profilePromise = new Promise(function(resolve, reject){
				School.findById(req.params.id, function(err, school){
					if(err) reject(err);
					if(!school){
						res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
						return reject(err);
					}
					schoolDocument = school;
					school.getProfiles({updated_at : '-1'},  10, function(err, profiles){
						if(err) reject(err);
						resolve(profiles);
					});
				});
			});
			profilePromise.then(function(profiles){
				res.render('schoolProfile', {
					profileList : profiles.map(profileViewModel),
					schoolInfo : schoolViewModel(schoolDocument),
					pageTestScript: '/qa/tests-schoolProfile.js'
				});
			}).catch(function(err){	return next(err); });
		},

		//:id에 해당하는 school의 Board를 10개 Return한다.
		schoolBoards: function(req, res, next){
			var boardPromise = new Promise(function(resolve, reject){
				Board.find({school : req.params.id}).sort({updated_at : '-1'})
				.limit(5).populate('school').exec(function(err, boards){
					if(err) reject(err);
					resolve(boards);
				});
			});
			var schoolPromise = new Promise(function(resolve, reject){
				School.findById(req.params.id, function(err, school){
					if(err) reject(err);
					if(!school){
						res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
						return next();
					}
					resolve(school)
				});
			});
			Promise.all([boardPromise , schoolPromise]).then(function(rtnArr){
				var boards = rtnArr[0];
				var school = rtnArr[1];
				res.render('schoolBoard', {
					boardList : boards.map(boardViewModel),
					schoolInfo: schoolViewModel(school),
					pageTestScript: '/qa/tests-schoolBoard.js'
				});
			}).catch(function(err){ next(err); });
		},

		//School활용을 위해!
		//rendering Create Board Form
		newBoard: function(req, res, next){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('newBoard', {
					schoolInfo: schoolViewModel(school),
					pageTestScript: '/qa/tests-newBoard.js'
				});
			});
		},

		//rendering Create Profile Form
		newProfile: function(req, res, next){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('newProfile', {
					newSchool: false,
					schoolInfo: schoolViewModel(school, true),
					pageTestScript: '/qa/tests-newProfile.js'
				});
			});
		},

		newSchool: function(req, res, next){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('newProfile', {
					newSchoolPage: true,
					schoolInfo: schoolViewModel(school),
					pageTestScript: '/qa/tests-newSchool.js'
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