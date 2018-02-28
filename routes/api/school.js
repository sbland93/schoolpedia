
var schoolHandlers = require('../../handlers/api/school.js')();

module.exports = function(app){
	//query가 있으면 query에 해당하는 school들을 조사
	app.get('/api/school', schoolHandlers.getSchools);

	//해당 id의 school을 응답은 success를 담아준다.
	app.put('/api/school/:id', schoolHandlers.updateSchool);

	//id에 해당하는 학교를 찾아서 반환해주는 API
	app.get('/api/school/:id', schoolHandlers.getSchool);

	//id에 해당하는 school의 available을 false로 만든다.
	app.delete('/api/school/:id', schoolHandlers.deleteSchool);

	//DOLATER req.body처리. 부자연스러움.
	//POST 응답을 어케해야할지.
	app.post('/api/school', schoolHandlers.newSchool);
}