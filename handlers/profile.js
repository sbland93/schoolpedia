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
				.populate('schools.school')
				.exec(function(err, profile){
				if(err) next(err);
				if(!profile){
					res.locals.message404 = '해당학생 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}else{
					res.render('profile', {
						profileId: req.params.id,
						profile: profileViewModel(profile),		
						pageTestScript: '/qa/tests-profile.js'
					});
				}
			});
		},	


		//rendering Create Profile Form(Step1)
		newProfileOne: function(req, res, next){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('newProfileOne', {
					schoolInfo: schoolViewModel(school, true),
					pageTestScript: '/qa/tests-newProfile.js'
				});
			});
		},

		//rendering Create Profile Form(Step2)
		newProfileTwo: function(req, res, next){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('newProfileTwo', {
					schoolInfo: schoolViewModel(school, true),
					pageTestScript: '/qa/tests-newProfile.js'
				});
			});
		},

		
		//rendering Create Profile Form
		//DOLATER 404보여주고 리다이렉트 시키기.
		updateProfile: function(req, res, next){
			Profile.findById(req.params.id)
				.populate('schools.school')
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
		//"school" => 'all', 'only' / "fields" => 'only', 'all'
		//"graduation" => 그대로활용  / "class" => schoolCategory를 통해서 활용
		//"q" => searchString
		//TODO: ajax api/로 바꾸자.
		searchProfiles: function(req, res, next){
			console.log('req.query From searchProfiles', req.query);

			var query = req.query
			var searchString = query.q;
			var data1 = {}, data2 = {}, data3 = {}, queryObject;

			//이름검색(only) / 본문포함(all)에 따라, data1생성.
			if(searchString !== ""){
				if(query.fields === "only"){
					data1 = {"name" : new RegExp(searchString)};
				}else if(query.fields === "all"){
					data1 = {$or: [{"name" : new RegExp(searchString)}, {'stories.content' : new RegExp(searchString)}]};
				}
			}

			//graduation이 없으면 따로 조건을 안주면 되는것.
			if(query.graduation !== ""){
				data2 = {"graduation" : query.graduation};
			}

			//학교내 검색(only) / 전체학교에서(all) 이면 따로 학교검색조건을 주지 않으면 된다.
			if(query.school !== ""){
				if(query.school === "only"){ //해당학교내 검색이면서,
					data3 = {"schools.school" : school._id};
					//학급 검색칸에 학급이 적혀있다면 (전체학교검색이라면 학급검색을 무시)
					if(query.classNum !== ""){
						data3["schools.class"] = query.classNum;
					}
				}
			}
			//queryObject를 생성하고.
			queryObject = {$and : [data1, data2, data3]};
			//검색후에 json응답.
			Profile.find(queryObject, function(err, profiles){
				if(err) return res.json({success: false, type: "Others"});
				return res.json({success: true, profileList: profiles});
			});
		}

	}

}