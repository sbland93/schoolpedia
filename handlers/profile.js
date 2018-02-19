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
		//query가 함께 날아오면 ( 학교페이지에서 생성버튼을 누른다면 학교를 추천해준다.)
		newProfileOne: function(req, res, next){
			
			console.log(req.query);
			if(!req.query || !req.query.school) return res.render('newProfileOne');

			if(req.query.school){
				School.findById(req.query.school , function(err, school){
					if(err) return next(err);
					return res.render('newProfileOne', {
						schoolInfo: schoolViewModel(school),
						pageTestScript: '/qa/tests-newProfile.js'
					});
				});
			}
		},

		//rendering Create Profile Form(Step2)
		newProfileTwo: function(req, res, next){
			if(!req.query || !req.query.school) return res.render('newProfileOne');

			School.findById(req.query.school , function(err, school){
				if(err) return next(err);
				return res.render('newProfileTwo', {
					schoolInfo: schoolViewModel(school),
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


		//"school" => 'all', 'only' / "fields" => 'only', 'all'
		//"graduation" => 그대로활용  / "class" => schoolCategory를 통해서 활용
		//"q" => searchString
		//scholId에는 해당학교 id가 적혀있음.
		//TODO: ajax api/로 바꾸자.
		searchProfiles: function(req, res, next){
			console.log('req.query From searchProfiles', req.query);
			//query가 없으면, searchedProfile들을 보여준다.
			if(!req.query) return res.render("profileSearch");
			
			var query = req.query
			var searchString = query.q;
			var data1 = {}, data2 = {}, data3 = {}, queryObject;

			//이름검색(only) / 본문포함(all)에 따라, data1생성.
			if(searchString && searchString !== ""){
				if(query.fields === "only"){
					data1 = {"name" : new RegExp(searchString)};
				}else if(query.fields === "all"){
					data1 = {$or: [{"name" : new RegExp(searchString)}, {'stories.content' : new RegExp(searchString)}]};
				}
			}

			//graduation이 없으면 따로 조건을 안주면 되는것.
			if(query.graduation && query.graduation !== ""){
				data2 = {"graduation" : query.graduation};
			}

			//학교내 검색(only) / 전체학교에서(all) 이면 따로 학교검색조건을 주지 않으면 된다.
			if(query.school && query.school !== ""){
				if(query.school === "only"){ //해당학교내 검색이면서,
					data3 = {"schools.school" : query.schoolId};
					//학급 검색칸에 학급이 적혀있다면 (전체학교검색이라면 학급검색을 무시)
					if(query.classNum !== ""){
						data3["schools.class"] = query.classNum;
					}
				}
			}
			//queryObject를 생성하고.
			queryObject = {$and : [data1, data2, data3]};
			console.log(queryObject);
			//검색후에 json응답.
			Profile.find(queryObject).populate('schools.school').exec(function(err, profiles){
				if(err) return next(err);
				return res.render('profileSearch', {profileList: profiles});
			});
			
		}

	}

}