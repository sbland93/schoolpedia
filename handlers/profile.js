var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
var schoolViewModel = require('../viewModels/school.js');
var boardViewModel = require('../viewModels/board.js');
var profileViewModel = require('../viewModels/profile.js');

module.exports = function(){

	return {

		//profile 페이지 라우팅
		profile: function(req, res, next){
			Profile.findById(req.params.id)
				.populate('highSchool middleSchool elementarySchool')
				.exec(function(err, profile){
				if(err) next(err);
				if(!profile){
					res.locals.message404 = '해당학생 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}else{
					res.render('profile', {
						profile: profileViewModel(profile),		
						pageTestScript: '/qa/tests-profile.js'
					});
				}
			})
		},	


		//rendering Create Profile Form
		newProfile: function(req, res, next){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('newProfile', {
					schoolInfo: schoolViewModel(school, true),
					pageTestScript: '/qa/tests-newProfile.js'
				});
			});
		},

		
		//rendering Create Profile Form
		//DOLATER 404보여주고 리다이렉트 시키기.
		updateProfile: function(req, res, next){
			Profile.findById(req.params.id)
				.populate('highSchool middleSchool elementarySchool')
				.exec(function(err, profile){
				if(err) next(err);
				if(!profile){
					res.locals.message404 = '잘못된 경로이거나, 수정하려는 학생이 없어졌거나 이동했어요ㅠㅠ';
					return next();
				}
				res.render('updateProfile', {
					profile: profileViewModel(profile),		
					pageTestScript: '/qa/tests-updateProfile.js'
				});
			});
		},


		//fields("school, fields, q")
		//"school" => 'all', 'only' / "fields" => 'name', 'all', 'stories'
		//"age" => 그대로활용  / "class" => schoolCategory를 통해서 활용
		//"q" => searchString
		//DOLATER 'stories'
		searchProfiles: function(req, res, next){
			console.log('req.query From searchProfiles', req.query);

			var query = req.query
			var stringQ = query.q;
			var data1 = {}, data2 = {}, data3 = {}, data4 = {}, queryObject;

			//DOLATER !School
			var schoolPromise = new Promise(function(resolve, reject){
				School.findById(query.schoolId, function(err, school){
					if(err) reject(err);
					resolve(school);
				});
			});

			if(stringQ !== ""){
				if(query.fields === "only"){
					data1 = {"name" : new RegExp(stringQ)};
				}else if(query.fields === "all"){
					data1 = {$or: [{"name" : new RegExp(stringQ)}, {'stories.content' : new RegExp(stringQ)}]};
				}
			}

			if(query.age !== ""){
				data2 = {"age" : query.age};
			}

			schoolPromise.then(function(school){
				if(!school){
					res.locals.message404 = '잘못된 주소이거나, 페이지가 이동했을거에요ㅠㅠ';
					return next();
				}

				if(query.school === "only"){
					data3[school.category] = school._id;
				}
				//school이 all일때랑 all이아닐때랑 class검색구별해야하는거 아닌가?
				if(query.classNum !== ""){
					switch(school.category){
						case 'highSchool' :
							data4 = {"highClass": query.classNum};
							break;
						case 'middleSchool' :
							data4 = {"middleClass": query.classNum};
							break;
						case 'elementarySchool' :
							data4 = {"elementaryClass": query.classNum};
							break;
					};
				}

				queryObject = {$and : [data1, data2, data3, data4]}

				Profile.find(queryObject, function(err, profiles){
					var context;
					if(!profiles.length){
						context = {
							empty: true,
							schoolInfo: schoolViewModel(school),
						}
					}else{
						context = {
							profileList : profiles.map(profileViewModel),
							schoolInfo : schoolViewModel(school),
						}
					}
					res.render('searchedProfiles', context);
				});
			});
		}


	}

}