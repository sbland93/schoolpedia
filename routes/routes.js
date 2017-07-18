var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
var schoolViewModel = require('../viewModels/school.js');
var boardViewModel = require('../viewModels/board.js');
var profileViewModel = require('../viewModels/profile.js');
var mongoose = require('mongoose');


module.exports = function(app){

	//School, Profile, Board에 해당하는 APIRouting 링크.
	require('./api/school.js')(app);
	require('./api/profile.js')(app);
	require('./api/board.js')(app);

	//Test epic fail uncaught Error
	app.get('/makeError', function(req, res){
		process.nextTick(function(){
			throw new Error('kaboom');	
		});
	});

	//home 페이지 라우팅.
	//schoolList가 필요.
	app.get('/', function(req, res, next){
		School.find({available: true}).sort({updated_at : '-1'})
		.exec(function(err, schools){
			if(err) next(err);
			res.render('home', {
				schoolList : schools.map(schoolViewModel),
				pageTestScript: '/qa/tests-home.js'
			});
		});
	});

	//Board Create Form.
	app.get('/board/new', function(req, res){
		res.render('newBoard');
	});

	//Profile Create Form.
	app.get('/profile/new', function(req, res){
		res.render('newProfile');
	});

	//profile 페이지 라우팅
	//DOLATER !profile
	app.get('/profile/:id', function(req, res, next){
		Profile.findById(req.params.id)
			.populate('highSchool middleSchool elementarySchol')
			.exec(function(err, profile){
			if(err) next(err);
			res.render('profile', {
				profile: profileViewModel(profile),		
				pageTestScript: '/qa/tests-profile.js'
			});
		})
	});

	//board 페이지 라우팅
	//DOLATER !board
	app.get('/board/:id', function(req, res, next){
		Board.findById(req.params.id)
		.exec(function(err, board){
			if(err) next(err);
			res.render('board', {
				board : boardViewModel(board),
				pageTestScript: '/qa/tests-board.js'
			});
		});
	});

	//:id에 해당하는 school의 Board, Profile을 5개씩 리턴한다.
	//DOLATER
	app.get('/school/:id', function(req, res, next){
		var schoolDocument;
		var profilePromise = new Promise(function(resolve, reject){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				//DOLATER if !school
				schoolDocument = school;
				if(!school) return next('No Data');
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
		}).catch(function(err){ next(err); });
	});

	//:id에 해당하는 school의 Profile을 10개 Return한다.
	app.get('/school/:id/profile', function(req, res, next){
		var schoolDocument;
		var profilePromise = new Promise(function(resolve, reject){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				//DOLATER if !school
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
		});
	});

	//:id에 해당하는 school의 Board를 10개 Return한다.
	app.get('/school/:id/board', function(req, res, next){
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
				resolve(school);
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
		});
	});

	//School활용을 위해!
	//rendering Create Board Form
	app.get('/school/:id/board/new', function(req, res, next){
		School.findById(req.params.id, function(err, school){
			if(err) next(err);
			//DOLATER !school
			res.render('newBoard', {
				schoolInfo: schoolViewModel(school),
				pageTestScript: '/qa/tests-newBoard.js'
			});
		});
	});

	//rendering Create Profile Form
	app.get('/school/:id/profile/new', function(req, res, next){
		School.findById(req.params.id, function(err, school){
			if(err) next(err);
			//DOLATER !school
			res.render('newProfile', {
				schoolInfo: schoolViewModel(school),
				pageTestScript: '/qa/tests-newProfile.js'
			});
		});
	})

	app.get('/test', function(req, res){
		res.render('test', {
			pageTestScript: '/qa/tests-clientAPI.js',
			showTests: true,
			testAPI: true,
		});
	});

}