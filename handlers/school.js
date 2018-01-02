var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
var schoolViewModel = require('../viewModels/school.js');
var boardViewModel = require('../viewModels/board.js');
var profileViewModel = require('../viewModels/profile.js');


module.exports = function(){

	return {

		newSchool: function(req, res, next){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('newSchool', {
					schoolInfo: schoolViewModel(school, true),
					pageTestScript: '/qa/tests-newSchool.js'
				});
			});
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
				res.render('schoolProfiles', {
					profileList : profiles.map(profileViewModel),
					schoolInfo : schoolViewModel(schoolDocument),
					pageTestScript: '/qa/tests-schoolProfiles.js'
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
				res.render('schoolBoards', {
					boardList : boards.map(boardViewModel),
					schoolInfo: schoolViewModel(school),
					pageTestScript: '/qa/tests-schoolBoards.js'
				});
			}).catch(function(err){ next(err); });
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

	}



}