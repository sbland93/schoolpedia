var Profile = require('../../models/profile.js');
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
	app.put('/api/profile/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');

		console.log(req.params.id);
		console.log(req.body);
		//수정할것이 담겨있는것.
		var query = req.body;
		//수정할 그 document를 가져오기위함
		var target = {_id: req.params.id};
		
		//options == "class"
		if(query.options){
			//options == "class"인지 확인 후.
			if(query.options === "class"){
				//쿼리에 스쿨아이디를 추가하는거야.
				target["schools.school"] = query.schoolId;
			}
			//options는 담기면 안되기 때문에 이건 삭제.
			delete query["options"];
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
		//query = {_id:profileId, features: {$elemMatch:{_id: targetId, participants:{$ne: userId} } } }
		var query = {
			_id: req.params.id,
		};
		query[data.target] = {};
		query[data.target]["$elemMatch"] = {_id: data.targetId, participants: {$ne: req.user._id}};
		//query[data.target]["participants"] = { $ne : req.user._id };
		console.log("query : ", query);
		//{ {$inc: {features.$.up: 1}}, $push  {features.$.participants: req.user._id}}
		var incNum;
		if(data.upOrDown === "up") incNum = 1;
		else if(data.upOrDown === "down") incNum = -1;
		var updateData = {$inc: {}, $push:{}};
		updateData.$inc[data.target+".$."+data.upOrDown] = incNum;
		updateData.$push[data.target+".$.participants"] = req.user._id;
		console.log("updateData : ", updateData);
		/*Profile.update(query, updateData, function(err, response){
			console.log(response);
			if(err) return next(err);
			if(response.nModified === 1){
				res.json({
					success: true,
					id: req.params.id,
				});
			} else {
				res.json({
					success: false,
					type: 'Already', //이게 꼭 이미 참여를 뜻하지 않는데...
				});
			}
		});*/

		var userUpdateObj = {$inc: {}};
		userUpdateObj[data.upOrDown] = incNum;
		Profile.find(req.params.id, function(err, profile){
			if(!profile) return res.json({success: false, type:"Others"});
			profile[data.target].map(function(element){
				if(element._id.equals(data.targetId)){
					var isAlready = element.participants.some(function(userId){
						return userId.equals(req.user._id);
					})
					if(isAlready) return res.json({success: false, type: "Already"});
					else return User.update(element.user, userUpdateObj ,function(err, response){
						if(err) return next(err);
						if(response.nModified === 1){
							return res.json({success: true, id: req.params.id});
						}else{
							return res.json({success: true, type: "Others"});
						}
					})
				}
			})
		})









	});










}