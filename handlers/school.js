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
				res.render('school/newSchool', {
					schoolInfo: schoolViewModel(school),
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
				res.render('school/schoolProfiles', {
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
				.limit(30).populate('school').exec(function(err, boards){
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
				res.render('school/schoolBoards', {
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
			//학교 아이디를 통해서, 학교의 정보를 가져온다.
			var schoolPromise = new Promise(function(resolve, reject){
				School.findById(req.params.id, function(err, school){
					if(err) reject(err);
					if(!school){
						res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
						return next();
					}
					resolve(school)
				});
			})

			//최신게시판 글을 가져온다
			var boardRecent = new Promise(function(resolve, reject){
				Board.find({school : req.params.id}).sort({updated_at : '-1'})
				.limit(5).populate('school').exec(function(err, recentBoards){
					if(err) reject(err);
					resolve(recentBoards);
				});
			});

			//베스트 글들을 가져온다.
			var boardBest = new Promise(function(resolve, reject){
				Board.find({school : req.params.id}).sort({up : '-1'})
				.limit(5).populate('school').exec(function(err,bestBoards){
					if(err) reject(err);
					resolve(bestBoards);
				})
			})

			//학교정보, 최신글, Hot게시물들을 데이터베이스에서 가져오는것을 완료하면, 응답한다.
			//TODO : 여기도 MAP을 해서 ViewModel을 입혀야한다.
			Promise.all([schoolPromise, boardRecent, boardBest]).then(function(rtnArr){
				res.render('school/school', {
					schoolInfo: schoolViewModel(rtnArr[0]),
					recentList : rtnArr[1].map(boardViewModel),
					bestList : rtnArr[2].map(boardViewModel),
				});
			}).catch(function(err){ return next(err); });

		},
		
	}
}