var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
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
				schoolList : schools.map(function(a){
					return {
						id: a._id,
						name: a.name,
						location: a.location,
						updated_at : a.updated_at,
					};
				}),
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
				profile: {
					id: profile._id,
					highSchool: profile.highSchool,
					middleSchool: profile.middleSchool,
					elementarySchool: profile.elementarySchool,
					class: profile.class,
					name: profile.name,
					age: profile.age,
					gender: profile.gender,
					description: profile.description,
					replies : profile.replies,
					updated_at: profile.updated_at,
				},		
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
				board : {
						id: board._id,
						title: board.title,
						school: board.school,
						content: board.content,
						replies : board.replies,
						updated_at: board.updated_at,
					},
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
				var query;
				switch(school.category){
					case '고등학교' :
						query = {highSchool: school._id};
						break;
					case '중학교' :
						query = {middleSchool: school._id};
						break;
					case '초등학교' :
						query = {elementarySchool: school._id};
						break;
				};
				Profile.find(query).sort({updated_at : '-1'})
					.limit(5).populate('highSchool middleSchool elementarySchool')
					.exec(function(err, profiles){
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
				schoolInfo: {
						id: schoolDocument._id,
						name: schoolDocument.name,
						location: schoolDocument.location,
						updated_at : schoolDocument.updated_at,
					},
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
				var query;
				schoolDocument = school;
				switch(school.category){
					case '고등학교' :
						query = {highSchool: school._id};
						break;
					case '중학교' :
						query = {middleSchool: school._id};
						break;
					case '초등학교' :
						query = {elementarySchool: school._id};
						break;
				};
				Profile.find(query).sort({updated_at : '-1'})
					.limit(10).populate('highSchool middleSchool elementarySchool').exec(function(err, profiles){
						if(err) reject(err);
						resolve(profiles);
					});
			});
		});
		profilePromise.then(function(profiles){
			res.render('schoolProfile', {
				profileList : profiles.map(function(a){
					return {
						id: a._id,
						highSchool: a.highSchool,
						middleSchool: a.middleSchool,
						elementarySchool: a.elementarySchool,
						class: a.class,
						name: a.name,
						age: a.age,
						gender: a.gender,
						description: a.description,
						replies : a.replies,
						updated_at: a.updated_at,
					};
				}),
				schoolInfo : {
					id: schoolDocument._id,
					name: schoolDocument.name,
					location: schoolDocument.location,
				},
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
		boardPromise.then(function(boards){
			res.render('schoolBoard', {
				boardList : boards.map(function(a){
					return {
						id: a._id,
						title: a.title,
						school: a.school,
						content: a.content,
						replies : a.replies,
						updated_at: a.updated_at,
					};
				}),
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
				schoolInfo: {
						id: school._id,
						name: school.name,
						location: school.location,
						updated_at : school.updated_at,
					},
				pageTestScript: '/qa/tests-newBoard.js'
			});
		});
	});

	//rendering Create Profile Form
	app.get('/school/:id/profile/new', function(req, res, next){
		res.render('newProfile');
	})

	app.get('/test', function(req, res){
		res.render('test', {
			pageTestScript: '/qa/tests-clientAPI.js',
			showTests: true,
			testAPI: true,
		});
	});

}