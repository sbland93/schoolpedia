
var homeHandlers = require('../handlers/home.js')();
var mongoose = require('mongoose');


module.exports = function(app){

	//School, Profile, Board에 해당하는 APIRouting 링크.
	require('./api/school.js')(app);
	require('./api/profile.js')(app);
	require('./api/board.js')(app);

	//home 페이지 라우팅.
	//schoolList가 필요.
	app.get('/', homeHandlers.home);

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
	app.get('/profile/:id', homeHandlers.profile);

	//rendering Update Profile Form
	app.get('/profile/:id/update', homeHandlers.updateProfile);

	//board 페이지 라우팅
	//DOLATER !board
	app.get('/board/search', homeHandlers.searchBoards);
	
	app.get('/board/:id', homeHandlers.board);

	app.get('/board/:id/update', homeHandlers.updateBoard);


	//:id에 해당하는 school의 Board, Profile을 5개씩 리턴한다.
	//DOLATER
	app.get('/school/:id', homeHandlers.school);

	app.get('/school/:id/new', homeHandlers.newSchool);

	//:id에 해당하는 school의 Profile을 10개 Return한다.
	app.get('/school/:id/profile', homeHandlers.schoolProfiles);

	//:id에 해당하는 school의 Board를 10개 Return한다.
	app.get('/school/:id/board', homeHandlers.schoolBoards);

	//School활용을 위해!
	//rendering Create Board Form
	app.get('/school/:id/board/new', homeHandlers.newBoard);

	//rendering Create Profile Form
	app.get('/school/:id/profile/new', homeHandlers.newProfile);


	//Client Test Page (API)
	app.get('/test', homeHandlers.clientTest);

	//Test epic fail uncaught Error
	app.get('/makeError', function(req, res){
		process.nextTick(function(){
			throw new Error('kaboom');	
		});
	});

}