var School = require('../../models/school.js');
var schoolViewModel = require('../../viewModels/school.js');

module.exports = function(){
	return {
		//query가 있으면 query에 해당하는 school들을 조사
		getSchools: function(req, res, next){
			var query = req.query;
			//query가 비어있다면
			if(req.query.name) query = {"name": new RegExp(req.query.name)};
			School.find(query, function(err, schools){
				if(err) return next(err);
				return res.json({
					success: true,
					schoolList: schools.map(schoolViewModel),
				});
			});
		},
		//해당 id의 school을 응답은 success를 담아준다.
		updateSchool: function(req, res, next){
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
		},
		//id에 해당하는 학교를 찾아서 반환해주는 API
		getSchool: function(req, res, next){
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
		},
		//id에 해당하는 school의 available을 false로 만든다.
		deleteSchool: function(req, res, next){
			if(!req.params.id) return next('No Id');
			School.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},

		newSchool: function(req, res, next){
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
		},

	}
}