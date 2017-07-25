var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var Board = require('../models/board.js');
var schoolViewModel = require('../viewModels/school.js');
var boardViewModel = require('../viewModels/board.js');
var profileViewModel = require('../viewModels/profile.js');



module.exports = function(){


	return {

		//home 페이지 라우팅.
		//available(true)인 학교들의 리스트들을 반환.
		home:  function(req, res, next){
			School.find({available: true}).sort({updated_at : '-1'})
			.exec(function(err, schools){
				if(err) next(err);
				res.render('home', {
					schoolList : schools.map(schoolViewModel),
					pageTestScript: '/qa/tests-home.js'
				});
			});
		},

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

		//board 페이지 라우팅
		board: function(req, res, next){
			Board.findById(req.params.id)
			.exec(function(err, board){
				if(err) next(err);
				if(!board){
					res.locals.message404 = '해당학교 글은 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('board', {
					board : boardViewModel(board),
					pageTestScript: '/qa/tests-board.js'
				});
			});
		},

		//:id에 해당하는 school의 Board, Profile을 5개씩 리턴한다.
		//DOLATER 학교글이 부족할경우.
		school: function(req, res, next){
			var schoolDocument;
			var profilePromise = new Promise(function(resolve, reject){
				School.findById(req.params.id, function(err, school){
					if(err) return reject(err);
					schoolDocument = school;
					if(!school){
						res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
						return next();
					}
					school.getProfiles({updated_at : '-1'},  5, function(err, profiles){
						if(err) reject(err);
						resolve(profiles);
					});
				});
			});
			var boardPromise = new Promise(function(resolve, reject){
				Board.find({school : req.params.id}).sort({updated_at : '-1'})
				.limit(5).populate('school').exec(function(err, boards){
					if(err) reject(err);
					resolve(boards);
				});
			});
			Promise.all([profilePromise, boardPromise]).then(function(rtnArr){
				res.render('school', {
					schoolInfo: schoolViewModel(schoolDocument),
					profileList : rtnArr[0],
					boardList : rtnArr[1],
				});
			}).catch(function(err){ return next(err); });
		},

		//:id에 해당하는 school의 Profile을 10개 Return한다.
		schoolProfiles: function(req, res, next){
			var schoolDocument;
			var profilePromise = new Promise(function(resolve, reject){
				School.findById(req.params.id, function(err, school){
					if(err) reject(err);
					if(!school){
						res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
						return reject(err);
					}
					schoolDocument = school;
					school.getProfiles({updated_at : '-1'},  10, function(err, profiles){
						if(err) reject(err);
						resolve(profiles);
					});
				});
			});
			profilePromise.then(function(profiles){
				res.render('schoolProfile', {
					profileList : profiles.map(profileViewModel),
					schoolInfo : schoolViewModel(schoolDocument),
					pageTestScript: '/qa/tests-schoolProfile.js'
				});
			}).catch(function(err){	return next(err); });
		},

		//:id에 해당하는 school의 Board를 10개 Return한다.
		schoolBoards: function(req, res, next){
			var boardPromise = new Promise(function(resolve, reject){
				Board.find({school : req.params.id}).sort({updated_at : '-1'})
				.limit(5).populate('school').exec(function(err, boards){
					if(err) reject(err);
					resolve(boards);
				});
			});
			var schoolPromise = new Promise(function(resolve, reject){
				School.findById(req.params.id, function(err, school){
					if(err) reject(err);
					if(!school){
						res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
						return next();
					}
					resolve(school)
				});
			});
			Promise.all([boardPromise , schoolPromise]).then(function(rtnArr){
				var boards = rtnArr[0];
				var school = rtnArr[1];
				res.render('schoolBoard', {
					boardList : boards.map(boardViewModel),
					schoolInfo: schoolViewModel(school),
					pageTestScript: '/qa/tests-schoolBoard.js'
				});
			}).catch(function(err){ next(err); });
		},

		//School활용을 위해!
		//rendering Create Board Form
		newBoard: function(req, res, next){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('newBoard', {
					schoolInfo: schoolViewModel(school),
					pageTestScript: '/qa/tests-newBoard.js'
				});
			});
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
					newSchool: false,
					schoolInfo: schoolViewModel(school, true),
					pageTestScript: '/qa/tests-newProfile.js'
				});
			});
		},

		newSchool: function(req, res, next){
			School.findById(req.params.id, function(err, school){
				if(err) next(err);
				if(!school){
					res.locals.message404 = '해당학교 페이지는 존재하지 않아요ㅠㅠ';
					return next();
				}
				res.render('newProfile', {
					newSchool: true,
					schoolInfo: schoolViewModel(school, true),
					pageTestScript: '/qa/tests-newSchool.js'
				});
			});
		},

		clientTest: function(req, res){
			res.render('test', {
				pageTestScript: '/qa/tests-clientAPI.js',
				showTests: true,
				testAPI: true,
			});
		},

		//rendering Create Profile Form
		//DOLATER 404보여주고 리다이렉트 시키기.
		updateProfile: function(req, res, next){
			Profile.findById(req.params.id)
				.populate('highSchool middleSchool elementarySchol')
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

		//rendering update Board Form
		//DOLATER 404보여주고 리다이렉트 시키기.
		updateBoard: function(req, res, next){
			Board.findById(req.params.id)
				.populate('school')
				.exec(function(err, board){
				if(err) next(err);
				if(!board){
					res.locals.message404 = '잘못된 경로이거나, 수정하려는 그 글은 없어졌거나 이동했어요ㅠㅠ';
					return next();
				}
				res.render('updateBoard', {
					board: boardViewModel(board),		
					pageTestScript: '/qa/tests-updateBoard.js'
				});
			});
		},

		//fields("school, fields, q")
		//"school" => 'all', 'only' / "fields" => 'title', 'content', 'all'
		//"q" => searchString
		//DOLATER 'content'
		searchBoards: function(req, res, next){
			var query = req.query
			var stringQ = query.q;
			var data, queryObject;

			if(query.fields === "title"){

				data = {"title" : new RegExp(stringQ)};
			
			}else if(query.fields === "all"){
			
				data = {$or: [{"title" : new RegExp(stringQ)}, {"content" : new RegExp(stringQ)}]};
			
			}
			console.log("data", data);

			if(query.school === "only"){
				queryObject = {$and : [{"school" : query.schoolId}, data]}
			}else if(query.school === "all"){
				queryObject = data;
			}

			console.log("queryObject", queryObject);

			//DOLATER !School
			var schoolPromise = new Promise(function(resolve, reject){
					School.findById(query.schoolId, function(err, school){
						if(err) reject(err);
						resolve(school);
					});
				});

			var boardPromise = new Promise(function(resolve, reject){
				Board.find(queryObject, function(err, boards){
					if(err) reject(err);
					resolve(boards);
				});
			});

			//DOLATER !school
			Promise.all([schoolPromise, boardPromise]).then(function(rtnArr){
				var schoolDoc = rtnArr[0];
				var boards = rtnArr[1];
				if(!boards.length){
					var context = {
						empty: true,
						schoolInfo : schoolViewModel(schoolDoc), 
					}
				}else{
					var context = {
						boardList : boards.map(boardViewModel),
						schoolInfo : schoolViewModel(schoolDoc), 
					};
				}
				res.render('searchedBoards', context);
			}).catch(function(err){
				next(err);
			});
			//DOLATER schoolBoards
			//DOLATER searchedBoards view.
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

				console.log("data1", data1);
				console.log("data2", data2);
				console.log("data3", data3);
				console.log("data4", data4);
				queryObject = {$and : [data1, data2, data3, data4]}
				console.log(queryObject);
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