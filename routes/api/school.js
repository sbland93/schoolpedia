var School = require('../../models/school.js');

module.exports = function(app){

/******
	api 계획

	api/school - get -> available한 school을 모두 가져온다.
	(성공응답: data Array를 보낸다.)

	api/school - put -> 요청본문의 data의 name의 school을 available상태로 만든다.
	(성공 응답: data.id를 보낸다.)
	
	api/school/:id - get -> 해당 id의 school을 하나 가져온다.
	(성공 응답: 해당 data를 보낸다.)

	api/school/:id - delete -> 해당 id의 school의 available을 false로 만든다.
	(성공 응답: data의 success를 true로 넣어서 응답한다.)

******/

	//열려있는 학교들의 배열을 반환하는 API
	//query가 있으면 query에 해당하는 school들을 조사
	//없으면 available = true인 school반환.
	app.get('/api/school', function(req, res, next){
		var query;
		(Object.keys(req.query).length === 0) ? (query = {available: true}) :
		(query = req.query);
		School.find(query, function(err, schools){
			if(err) return next(err);
			res.json(schools.map(function(a){
				return {
					name: a.name,
					id: a._id,
					location: a.location,
				}
			}));
		});
	});

	//해당 id의 school을 available상태로 만들고 응답은 success를 담아준다.
	app.put('/api/school/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		School.findById(req.params.id, function(err, school){
			if(err) console.error(err);
			/*DOLATER err 처리 */
			if(!school){
				return res.json({
					success: false,
					message: 'NO DATA',
				});
			}else{
				if(!school.available){
					school.available = true;
					school.save(function(err, el){
						if(err) return next(err);
						res.json({
							success: true,
							id : el._id,
						});
					});
				} else {
					res.json({
						success: false,
						message: 'Already'
					});
				}
			}
		});
	});

	//id에 해당하는 학교를 찾아서 반환해주는 API
	app.get('/api/school/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		School.findById(req.params.id, function(err, school){
			if(err) return next(err);
			if(school) res.json({
				success: true,
				id: school._id,
				name: school.name,
				location: school.location,
			});
		});
	});

	//id에 해당하는 school의 available을 false로 만든다.
	app.delete('/api/school/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		School.findById({_id: req.params.id}, function(err, school){
			if(err) return next(err);
			if(school && school.available){
				school.available = false;
				school.save(function(err, a){
					res.json({
						success: true,
						id: school._id,
					});
				});
			} 
		});
	});
}