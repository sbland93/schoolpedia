var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
var Info = require('../models/info.js');
var schoolViewModel = require('../viewModels/school.js');
var boardViewModel = require('../viewModels/board.js');
var profileViewModel = require('../viewModels/profile.js');
var infoViewModel = require('../viewModels/info.js');
module.exports = function(){


	return {

		//home 페이지 라우팅.
		//available(true)인 학교들의 리스트들을 반환.
		home:  function(req, res, next){
			School.find({available: true}).sort({updated_at : '-1'})
			.exec(function(err, schools){
				if(err) next(err);
				Info.find(function(err,infos){
					if(err) next(err);
					res.render('home', {
						schoolList : schools.map(schoolViewModel),
						pageTestScript: '/qa/tests-home.js',
						infoList: infos.map(infoViewModel),
					});
 				})
				
			});
		},
		
		clientTest: function(req, res){
			res.render('test', {
				pageTestScript: '/qa/tests-clientAPI.js',
				showTests: true,
				testAPI: true,
			});
		},

	}
	
}