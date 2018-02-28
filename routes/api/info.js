var authHandlers = require("../../handlers/auth.js")();
var infoHandlers = require('../../handlers/api/info.js')();

module.exports = function(app){
	
	app.get("/api/info", infoHandlers.getInfos);

	app.get("/api/info/:id",infoHandlers.getInfo);
	//공지사항 추가시
	app.post("/api/info", authHandlers.isAdmin, infoHandlers.newInfo);
	//공지사항 수정
	app.put("/api/info/:id", authHandlers.isAdmin, infoHandlers.updateInfo);
	//공지사항 삭제
	app.delete("/api/info/:id", authHandlers.isAdmin, infoHandlers.deleteInfo);

}