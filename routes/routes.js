
var homeHandlers = require('../handlers/home.js')();
var schoolHandlers = require('../handlers/school.js')();
var profileHandlers = require('../handlers/profile.js')();
var boardHandlers = require('../handlers/board.js')();
var mongoose = require('mongoose');
var loginHandlers = require('../handlers/auth.js')();

module.exports = function(app){

	//School, Profile, Board에 해당하는 APIRouting 링크.
	require('./api/school.js')(app);
	require('./api/profile.js')(app);
	require('./api/board.js')(app);

	//home 페이지 라우팅.
	//schoolList가 필요.
	app.get('/', homeHandlers.home);

	//login 페이지 라우팅.
	app.get('/login',loginHandlers.login);
	//회원가입 페이지 라우팅.
	app.get('/register',loginHandlers.register);
	//:id에 해당하는 school의 Board, Profile을 5개씩 리턴한다.
	//DOLATER
	app.get('/school/:id', schoolHandlers.school);

	app.get('/school/:id/new', schoolHandlers.newSchool);

	//:id에 해당하는 school의 Profile을 10개 Return한다.
	app.get('/school/:id/profile', schoolHandlers.schoolProfiles);

	//:id에 해당하는 school의 Board를 10개 Return한다.
	app.get('/school/:id/board', schoolHandlers.schoolBoards);

	//profile 페이지 라우팅
	//DOLATER !profile
	app.get('/profile/search', profileHandlers.searchProfiles);

	app.get('/profile/:id', profileHandlers.profile);

	//rendering Update Profile Form
	app.get('/profile/:id/update', profileHandlers.updateProfile);

	//rendering Create Profile Form(Step1)
	app.get('/school/:id/profile/newOne', profileHandlers.newProfileOne);

	//rendering Create Profile Form(Step2)
	app.get('/school/:id/profile/newTwo', profileHandlers.newProfileTwo);

	//board 페이지 라우팅
	//DOLATER !board
	app.get('/board/search', boardHandlers.searchBoards);
	
	app.get('/board/:id', boardHandlers.board);

	app.get('/board/:id/update', boardHandlers.updateBoard);

	//School활용을 위해!
	//rendering Create Board Form
	app.get('/school/:id/board/new', boardHandlers.newBoard);






	//Client Test Page (API)
	app.get('/test', homeHandlers.clientTest);

	//Test epic fail uncaught Error
	app.get('/makeError', function(req, res){
		process.nextTick(function(){
			throw new Error('kaboom');	
		});
	});

}