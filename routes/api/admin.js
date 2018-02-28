var Board = require('../../models/board.js');
var Profile = require('../../models/profile.js');
var User = require('../../models/user.js');
var authHandlers = require('../../handlers/auth.js')();
var adminHandlers = require('../../handlers/api/admin.js')();


module.exports = function(app){
	//admin페이지 board 삭제.
	app.delete('/api/admin/board/:id', authHandlers.isAdmin, adminHandlers.adminDeleteBoard);
	//admin페이지 profile 삭제.
	app.delete('/api/admin/profile/:id', authHandlers.isAdmin, adminHandlers.adminDeleteProfile);
	//admin페이지 익명 게시글 생성.
	app.post('/api/admin/board', authHandlers.isAdmin, adminHandlers.adminPostBoard);
}