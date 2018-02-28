var Profile = require('../../models/profile.js');
var User = require('../../models/user.js');
var School = require('../../models/school.js');
var authHandlers = require('../../handlers/auth.js')();

var profileViewModel = require('../../viewModels/profile.js');


module.exports = function(app){


	//Query를 보내면,쿼리에 해당하는 profile에 해당하는 것들을 내보내고
	//Query가 없으면 모든 profile을 내보낸다.
	app.get('/api/profile', function(req, res, next){
		var query = req.query;

		if(req.query.name) query.name = new RegExp('^'+req.query.name);
		Profile.find(query)
			.populate('schools.school')
			.exec(function(err, profiles){
				if(err) return next(err);
				if(profiles.length === 0) return res.json({
					success: false,
					message: 'NO DATA',
				});
				res.json(profiles.map(profileViewModel));
			});
	});

	//요청본문에 해당하는 profile을 새로 생성한다.
	//검증과정이 있어야하는데, 어떤게 필수일까 name, graduation, gender은 필수로 하자!
	//DOLATER school중 하나도 있어야한다.
	app.post('/api/profile', function(req, res, next){
		if(req.body.name && req.body.graduation && req.body.gender){
			Profile.create(req.body, function(err, profile){
				if(err) return next(err);
				res.json(profileViewModel(profile));
			});
		}else{
			res.json({
				success: false
			});
		}
	})


	//"school" => 'all', 'only' / "fields" => 'only', 'all'
	//"graduation" => 그대로활용  / "class" => schoolCategory를 통해서 활용
	//"q" => searchString
	//scholId에는 해당학교 id가 적혀있음.
	//TODO: ajax api/로 바꾸자.
	app.post('/api/profile/search', function(req, res, next){
		

		var query = req.body
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
				data3 = {"schools.school" : query.schoolId};
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
		
	});

	//"school" => 'all', 'only' / "fields" => 'only', 'all'
	//"graduation" => 그대로활용  / "class" => schoolCategory를 통해서 활용
	//"q" => searchString
	//scholId에는 해당학교 id가 적혀있음.
	//TODO: ajax api/로 바꾸자.
	app.post('/api/profile/search/test', function(req, res, next){
		
		var query = req.body
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

		var p1;
		//학교내 검색(only) / 전체학교에서(all) 이면 따로 학교검색조건을 주지 않으면 된다.
		if(query.school !== ""){
			if(query.school === "only" && query.schoolName){ //해당학교내 검색이면서 학교이름이 함께오면,
				//학교이름에 해당하는 SchoolId를 찾아서, 조건에 넣어준다.
				var schoolIdCondition = { $in : [] };
				p1 = new Promise(function(resolve, reject){
					School.find({name: new RegExp(query.schoolName)}, function(err, schools){
						if(err) reject(err);
						for(var i=0; i<schools.length; i++){
							schoolIdCondition["$in"].push(schools[i]._id);
						}
						data3 = {"schools.school" : schoolIdCondition};
						
						resolve();
					});
				});
				

				//학급 검색칸에 학급이 적혀있다면 (전체학교검색이라면 학급검색을 무시)
				if(query.classNum !== ""){
					data3["schools.class"] = query.classNum;
				}
			}
		}

		if(p1 === undefined) p1 = new Promise(function(resolve, reject){ resolve(); });
		p1.then(function(data){
			//queryObject를 생성하고.
			queryObject = {$and : [data1, data2, data3]};
			//검색후에 json응답.
			Profile.find(queryObject).limit(40).exec(function(err, profiles){
				if(err) return res.json({success: false, type: "Others"});
				return res.json({success: true, profileList: profiles});
			});
		}).catch(function(err){res.json({success: false, type: "Others"})});
		
		
	});


	//해당 id의 profile을 available상태로 만들고 응답은 success를 담아준다.
	app.get('/api/profile/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		Profile.findById({_id: req.params.id}).populate('schools.school').populate('replies.user').exec(function(err, profile){
			if(err) return next(err);
			return res.json(profileViewModel(profile));
		});
	});


	//id에 해당하는 profile을 삭제한다.
	app.delete('/api/profile/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		Profile.remove({_id: req.params.id}, function(err){
			if(err) return next(err);
			res.json({
				success: true,
			});
		})
	});


	//id에 해당하는 profile을 요청본문을 토대로 업데이트한다.
	app.put('/api/profile/:id', authHandlers.ajaxIsLoggedIn, function(req, res, next){
		if(!req.params.id) return next('No Id');
		//수정할것이 담겨있는것.
		var query = req.body;
		//수정할 그 document를 가져오기위함
		var target = {_id: req.params.id};
		
		//options == "class"
		if(query.options){
			//검색 컨디션이 더 있는경우는, 합쳐서 검색해준다.
			if(query.options.conditions){
				var conditions = query.options.conditions;
				if(Object.assign){
					
					Object.assign(target , conditions);
					
				}else{
					for (var attrname in conditions) { target[attrname] = conditions[attrname]; }
				}
			}

			if(query.options === "contents"){ //content: "features","stories","replies"
				var newQuery = {$push: {}, };
				//$sort옵션을 통해서 updated_at이 최신순으로 유지되도록한다.
				newQuery["$push"][query.target] ={ $each: [{ user: req.user._id, content: query.body }], $sort : { updated_at: -1 } }; 
				//query는 : {options: "contents", target: "stories", body: content};
				//{$push: {stories : { content: newStory }}}
				query = newQuery;
				query["$set"] = {"updated_at": Date.now()};
			}

			//options는 담기면 안되기 때문에 이건 삭제.
			delete query["options"];
		}

		console.log("query:", query);
		//업데이트 마다 {updated_at : Date.now}를 넣어서, 업데이트 될때마다 업데이트 프로필임을 알린다.
		Profile.findOneAndUpdate(target, query, {new: true}, function(err, doc){
			if(err || !doc) return res.json({success: false, type: "Others"});
			doc.populate('schools.school replies.user', function(err, rtnDoc){
				if(err) return res.json({success: false});
				return res.json({success: true, changedDoc: doc});
			})
		});
	});


	//id에 해당하는 profile을 요청본문을 토대로 업데이트한다.
	app.put('/api/profile/:id/updown', authHandlers.ajaxIsLoggedIn ,function(req, res, next){
		if(!req.params.id) return next('No Id');
		var data = req.body; 
		if(!data.target || !data.targetId || !data.upOrDown){
			return res.json({success: false, type: "Others"});
		}
		var incNum;
		if(data.upOrDown === "up") incNum = 1;
		else if(data.upOrDown === "down") incNum = -1;

		var userUpdateObj = {$inc: {}};
		userUpdateObj["$inc"][data.upOrDown] = incNum;
		
		Profile.findById(req.params.id, function(err, profile){
			if(err) return res.json({success: false, type: "Others"});
			if(!profile) return res.json({success: false, type:"Others"});
			
			profile[data.target].map(function(element){
				
				if(element._id.equals(data.targetId)){
					
					var isAlready = element.participants.some(function(userId){
						return userId.equals(req.user._id);
					});
					
					if(isAlready) return res.json({success: false, type: "Already"});
					else{
						element.participants.push(req.user._id);
						element[data.upOrDown] += incNum;
						//프로필을 수정하는 Promise
						var p1 = new Promise(function(resolve, reject){
							profile.save(function(err){
								if(err) return reject(err);
								return resolve();
							});
						});
						//User의 up을 수정하는 Promise.
						var p2 = new Promise(function(resolve, reject){
							User.update({_id: element.user}, userUpdateObj, function(err, response){
								if(err) return reject(err);
								return resolve(response);
							});
						});
						//프로필수정과 User수정 두개가 완료가 되면.
						Promise.all([p1, p2]).then(function(responseArray){
							if(responseArray[1].nModified === 1){
								return res.json({success: true, id: req.params.id});
							}else{
								return res.json({success: false, type: "Others", message: "유저 UP/DOWN적용 실패"});
							}
						}).catch(function(err){
							console.log(err);
							return next(err);
						});
					} 
				}
			})
		});
	});




}