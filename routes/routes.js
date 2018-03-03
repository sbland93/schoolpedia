
var homeHandlers = require('../handlers/home.js')();
var schoolHandlers = require('../handlers/school.js')();
var profileHandlers = require('../handlers/profile.js')();
var boardHandlers = require('../handlers/board.js')();
var mongoose = require('mongoose');
var authHandlers = require('../handlers/auth.js')();
var passport = require('passport');
var Info = require('../models/info.js');
var adminHandlers = require('../handlers/admin.js')();

module.exports = function(app){

	//home 페이지 라우팅. 홈에서는 로그인되어있다면 뉴스피드 화면, 로그인 되어있지 않다면 로그인화면을 보여준다.
	app.get('/', homeHandlers.home);
	//post방식으로 보내면 로그인 확인을 한다.
	app.post('/', authHandlers.localLogin);
	
	//School, Profile, Board, User, admin에 해당하는 APIRouting 링크.
	require('./api/school.js')(app);
	require('./api/profile.js')(app);
	require('./api/board.js')(app);
	require('./api/user.js')(app);
	require('./api/info.js')(app);
	require('./traditional/info.js')(app);
	require('./api/admin.js')(app);
	
	//관리자 페이지 라우팅.
	app.get('/admin', authHandlers.isAdmin, adminHandlers.adminPage);
	//관리자 페이지에서 게시글 작성 페이지 라우팅.
	app.get('/admin/school/:id/board/new', authHandlers.isAdmin, adminHandlers.adminNewBoard);

	//사용자 관리 페이지 라우팅.
	app.get('/myControll', authHandlers.isLoggedIn, homeHandlers.myControll);

	//login 페이지 라우팅.
	app.get('/login', authHandlers.login);

	//회원가입 페이지 라우팅.
	app.get('/register', authHandlers.register);

	//ajax통신부분.
	app.post('/register', authHandlers.localSignup);

	app.get('/logout', authHandlers.logout);

	app.get('/authInfo', authHandlers.ajaxAuth);
	app.get('/alarm', authHandlers.isLoggedIn, homeHandlers.alarm);

	//:id에 해당하는 school의 Board, Profile을 5개씩 리턴한다.
	//DOLATER
	app.get('/school/:id',authHandlers.isLoggedIn, schoolHandlers.school);

	//app.get('/school/:id/new', schoolHandlers.newSchool);

	//:id에 해당하는 school의 Profile을 10개 Return한다.
	app.get('/school/:id/profile',authHandlers.isLoggedIn, schoolHandlers.schoolProfiles);

	//:id에 해당하는 school의 Board를 10개 Return한다.
	app.get('/school/:id/board',authHandlers.isLoggedIn, schoolHandlers.schoolBoards);

	//profile 페이지 라우팅
	//DOLATER !profile
	app.get('/profile/search',authHandlers.isLoggedIn, profileHandlers.searchProfiles);
	
	//rendering Create Profile Form(Step1)
	app.get('/profile/newOne', authHandlers.isLoggedIn, profileHandlers.newProfileOne);

	//rendering Create Profile Form(Step2)
	app.get('/profile/newTwo', authHandlers.isLoggedIn, profileHandlers.newProfileTwo);
	//개인의 프로필.
	app.get('/profile/:id',authHandlers.isLoggedIn, profileHandlers.profile);

	app.get('/board/:id', authHandlers.isLoggedIn, boardHandlers.board);

	app.get('/board/:id/update', authHandlers.isLoggedIn, boardHandlers.updateBoard);
	//rendering Create Board Form
	app.get('/school/:id/board/new', authHandlers.isLoggedIn, boardHandlers.newBoard);

}