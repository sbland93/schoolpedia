var School = require('./models/school.js');
var Profile = require('./models/profile.js');
var Board = require('./models/board.js');


module.exports = function(app){

	//School, Profile, Board에 해당하는 APIRouting 링크.
	require('./routes/api/school.js')(app);
	require('./routes/api/profile.js')(app);
	require('./routes/api/board.js')(app);


	//Test epic fail uncaught Error
	app.get('/makeError', function(req, res){
		process.nextTick(function(){
			throw new Error('kaboom');	
		});
	});

	//home 페이지 라우팅.
	//schoolList가 필요.
	app.get('/', function(req, res, next){
		School.find({available: true}, null, {sort: {date: 1}}, function(err, schools){
			if(err) next(err);
			res.render('home', {
				schoolList : schools.map(function(a){
					return {
						name: a.name,
						location: a.location,
						updated_at : a.updated_at,
					};
				}),
				pageTestScript: '/qa/tests-home.js'
			});
		});
	});

	//:id에 해당하는 school의 Board, Profile을 가져온다.
	app.get('/school/:id', function(req, res){
		res.render('school', {
			pageTestScript: 'qa/tests-school.js'
		});
	});

	//profile 페이지 라우팅
	app.get('/profile', function(req, res){
		res.render('profile', {
			pageTestScript: 'qa/tests-profile.js'
		});
	});

	//board 페이지 라우팅
	app.get('/board', function(req, res){
		res.render('board', {
			pageTestScript: 'qa/tests-board.js'
		});
	});


}