var Board = require('../../models/board.js');
var User = require('../../models/user.js');
var boardViewModel = require('../../viewModels/board.js');
var authHandlers = require('../../handlers/auth.js')();
var boardHandlers = require('../../handlers/api/board.js')();

module.exports = function(app){

	//Query를 보내면,쿼리에 해당하는 board에 해당하는 것들을 내보내고
	//Query가 없으면 모든 board을 내보낸다.
	/*query에 options가 담겨오는데, school: here or all 이고 fields: title or all 이다.*/
	app.get('/api/board', boardHandlers.getBoards);

	//요청본문에 해당하는 board을 새로 생성한다.
	//검증과정이 있어야하는데, title, content, school이 필수로 들어가야한다.
	//또한, user의 데이터베이스에 그 게시글 id를 넣어두어야 한다.
	app.post('/api/board', authHandlers.ajaxIsLoggedIn, boardHandlers.newBoard);

	//해당 id의 board을 available상태로 만들고 응답은 success를 담아준다.
	app.get('/api/board/:id', boardHandlers.getBoard);

	//로그인되어있는지 확인후, writer와 user가 일치하면
	//1. 유저의 boards(내가 쓴글)에서 삭제한다.
	//2. 유저의 boards에서 삭제가 된것을 확인한 후, 그 board를 삭제한다.
	app.delete('/api/board/:id', authHandlers.ajaxIsLoggedIn, boardHandlers.deleteBoard);

	//id에 해당하는 board을 요청본문을 토대로 업데이트한다.
	//게시글을 수정하는것과, 댓글을다는것 => option으로 
	app.put('/api/board/:id', authHandlers.ajaxIsLoggedIn, boardHandlers.updateBoard);

	//id에 해당하는 board을 요청본문을 토대로 업데이트한다.
	app.put('/api/board/:id/updown', authHandlers.ajaxIsLoggedIn, boardHandlers.updateBoardUpDown);

}