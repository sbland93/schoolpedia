var Profile = require('../../models/profile.js');
var User = require('../../models/user.js');
var authHandlers = require('../../handlers/auth.js')();

var profileViewModel = require('../../viewModels/profile.js');


module.exports = function(app){


	//Query를 보내면,쿼리에 해당하는 profile에 해당하는 것들을 내보내고
	//Query가 없으면 모든 profile을 내보낸다.
	app.get('/api/profile', function(req, res, next){
		var query = req.query;
		console.log(query);
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
				res.json({
					success: true,
					id: profile._id,
					school: profile.school,
					class: profile.class,
					name: profile.name,
					graduation: profile.graduation,
					gender: profile.gender,
					description: profile.description,
					replies : profile.replies,
				});
			});
		}else{
			res.json({
				success: false
			});
		}
	})

	app.post('/api/profile/search', function(req, res, next){
		console.log('req.body From searchProfiles', req.body);

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
		
	});




	//해당 id의 profile을 available상태로 만들고 응답은 success를 담아준다.
	app.get('/api/profile/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		Profile.findById({_id: req.params.id}).populate('schools.school').exec(function(err, profile){
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

		console.log(req.params.id);
		console.log(req.body);
		//수정할것이 담겨있는것.
		var query = req.body;
		//수정할 그 document를 가져오기위함
		var target = {_id: req.params.id};
		
		//options == "class"
		if(query.options){
			if(query.options === "contents"){ //content: "features","stories","replies"
				var newQuery = {$push: {}};
				newQuery["$push"][query.target] = {user: req.user._id, content: query.body};
				//query는 : {options: "contents", target: "stories", body: content};
				//{$push: {stories : { content: newStory }}}
				query = newQuery;
			} else if(query.options === "class"){ //options == "class"인지 확인 후.
				//쿼리에 스쿨아이디를 추가하는거야.
				target["schools.school"] = query.schoolId;
				//options는 담기면 안되기 때문에 이건 삭제.
				delete query["options"];
			}
			
		}

		console.log("query:", query);
		console.log("target:", target);

		//DOLATER - 업데이트 메커니즘 적용 및 업데이트 검증.
		Profile.update(target, query, function(err, response){
			if(err) return next(err);
			console.log("here");
			console.log(response);
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
		console.log("userUpdateObj: ", userUpdateObj);

		Profile.findById(req.params.id, function(err, profile){
			if(err) return res.json({success: false, type: "Others"});
			if(!profile) return res.json({success: false, type:"Others"});
			console.log("profile[data.target]:",profile[data.target]);
			profile[data.target].map(function(element){
				console.log("element._id:", element._id);
				console.log("typeof(element._id):", typeof(element._id));
				if(element._id.equals(data.targetId)){
					console.log("일단같은것은 있다: element:", element);
					var isAlready = element.participants.some(function(userId){
						return userId.equals(req.user._id);
					});
					console.log("isAlready: ", isAlready);
					if(isAlready) return res.json({success: false, type: "Already"});
					else{
						element.participants.push(req.user._id);
						element[data.upOrDown] += incNum;
						var p1 = new Promise(function(resolve, reject){
							profile.save(function(err){
								if(err) return reject(err);
								return resolve();
							});
						});
						var p2 = new Promise(function(resolve, reject){
							User.findByIdAndUpdate(element.user, userUpdateObj, function(err, response){
								if(err) return reject(err);
								return resolve(response);
							});
						});
						Promise.all([p1, p2]).then(function(responseArray){
							if(responseArray[1].err) return next(err);
							if(responseArray[1].nModified === 1){
								return res.json({success: true, id: req.params.id});
							}else{
								return res.json({success: true, type: "Others"});
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