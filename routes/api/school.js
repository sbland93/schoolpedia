var School = require('../../models/school.js');

module.exports = function(app){

	//열려있는 학교들의 배열을 반환하는 API
	//query가 있으면 query에 해당하는 school들을 조사
	//없으면 available = true인 school반환.
	app.get('/api/school', function(req, res, next){
		var query = req.query;
		//query가 비어있다면
		if(Object.keys(req.query).length === 0)	query = {available: true};
		else if(req.query.name)	query = {"name": new RegExp('^'+req.query.name)};
		School.find(query, function(err, schools){
			if(err) return next(err);
			if(schools.length === 0) return res.json({
				success: false,
				message: 'NO DATA',
			});
			res.json(schools.map(function(a){
				return {
					name: a.name,
					id: a._id,
					location: a.location,
					category: a.category,
					updated_at: a.updated_at,
					available: a.available,
				}
			}));
		});
	});

	//해당 id의 school을 응답은 success를 담아준다.
	app.put('/api/school/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		//DOLATER req.body를 그대로 신뢰해서는 안된다.
		School.update({_id: req.params.id}, req.body ,function(err, response){
			if(err) console.error(err);
			if(response.nModified === 1){
				res.json({
					success: true,
					id: req.params.id,
				});
			} else {
				res.json({
					success: false,
					message: ''
				});
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
		School.remove({_id: req.params.id}, function(err){
			if(err) return next(err);
			res.json({
				success: true,
			});
		});
	});

	//DOLATER req.body처리. 부자연스러움.
	//POST 응답을 어케해야할지.
	app.post('/api/school', function(req, res, next){
		if(!req.body) return next('NO DATA')
		School.create(req.body, function(err, school){
			if(err) return next(err);
			res.json({
				success: true,
				id: school._id,
				name: school.name,
				location : school.location,
			});
		});
	});
}