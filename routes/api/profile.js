
var authHandlers = require('../../handlers/auth.js')();
var profileHandlers = require('../../handlers/api/profile.js')();

module.exports = function(app){
	//Query를 보내면,쿼리에 해당하는 profile에 해당하는 것들을 내보내고
	//Query가 없으면 모든 profile을 내보낸다.
	app.get('/api/profile', profileHandlers.getProfiles);

	//요청본문에 해당하는 profile을 새로 생성한다.
	//검증과정이 있어야하는데, 어떤게 필수일까 name, graduation, gender은 필수로 하자!
	//DOLATER school중 하나도 있어야한다.
	app.post('/api/profile', profileHandlers.newProfile);

	//"school" => 'all', 'only' / "fields" => 'only', 'all'
	//"graduation" => 그대로활용  / "class" => schoolCategory를 통해서 활용
	//"q" => searchString
	//scholId에는 해당학교 id가 적혀있음.
	//TODO: ajax api/로 바꾸자.
	app.post('/api/profile/search', profileHandlers.searchProfile);

	//"school" => 'all', 'only' / "fields" => 'only', 'all'
	//"graduation" => 그대로활용  / "class" => schoolCategory를 통해서 활용
	//"q" => searchString
	//scholId에는 해당학교 id가 적혀있음.
	//TODO: ajax api/로 바꾸자.
	app.post('/api/profile/search/test', profileHandlers.searchProfileTest);

	//해당 id의 profile을 available상태로 만들고 응답은 success를 담아준다.
	app.get('/api/profile/:id', profileHandlers.getProfile);

	//id에 해당하는 profile을 삭제한다.
	app.delete('/api/profile/:id', profileHandlers.deleteProfile);

	//id에 해당하는 profile을 요청본문을 토대로 업데이트한다.
	app.put('/api/profile/:id', authHandlers.ajaxIsLoggedIn, profileHandlers.updateProfile);

	//id에 해당하는 profile을 요청본문을 토대로 업데이트한다.
	app.put('/api/profile/:id/updown', authHandlers.ajaxIsLoggedIn, profileHandlers.updateProfileUpDown);




}