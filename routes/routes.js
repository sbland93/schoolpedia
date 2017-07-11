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

	//:id에 해당하는 school의 Board, Profile을 5개씩 리턴한다.
	//DOLATER
	app.get('/school/:id', function(req, res, next){
		var profilePromise = new Promise(function(resolve, reject){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				//DOLATER if !school
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
					.limit(5).populate('highSchool middleSchool elementarySchool').exec(function(err, profiles){
						if(err) reject(err);
						console.log(profiles);
						resolve(profiles);
					});
			});
		});
		var boardPromise = new Promise(function(resolve, reject){
			Board.find({school : req.params.id}).sort({updated_at : '-1'})
			.limit(5).populate('school').exec(function(err, boards){
				console.log(boards);
				if(err) reject(err);
				resolve(boards);
			});
		});
		Promise.all([profilePromise, boardPromise]).then(function(rtnArr){
			res.render('school', {
				profileList : rtnArr[0],
				boardList : rtnArr[1],
			});
		}).catch(function(err){ next(err); });
	});

	//profile 페이지 라우팅
	app.get('/profile', function(req, res){
		Profile.find({}).sort({updated_at : '-1'})
			.limit(5).populate('highSchool middleSchool elementarySchol')
			.exec(function(err, profiles){
			if(err) next(err);
			res.render('profile', {
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
				pageTestScript: '/qa/tests-profile.js'
			});
		})
	});

	//board 페이지 라우팅
	app.get('/board', function(req, res){
		Board.find({}).sort({updated_at : '-1'})
		.exec(function(err, boards){
			if(err) next(err);
			res.render('board', {
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
				pageTestScript: '/qa/tests-board.js'
			});
		});
	});

}