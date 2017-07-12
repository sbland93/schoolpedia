var Profile = require('../../models/profile.js');



module.exports = function(app){


/******


	api 계획

	api/profile?query - get -> if(!query) profile을 모두 가져온다.
	if(query) 해당쿼리에 해당하는 모든 profile을 꺼내온다.(보통 이름으로 조사하게 될것.) 
	(성공응답: data Array를 보낸다.)

	api/profile- post -> 요청 본문의 profile을 추가한다.
	(성공 응답: data.id를 보낸다./ data.success)
	
	api/profile/:id - get -> 해당 id의 profile을 하나 가져온다.
	(성공 응답: 해당 data를 보낸다. / data.success)

	api/profile/:id - delete -> 해당 id의 profile 삭제.
	(성공 응답: data.success)


	//replySchema의 subdocument.
	var replySchema = mongoose.Schema({
		user: String,
		content: String,
	});

	//school의 reference.
	var profileSchema = mongoose.Schema({
		school:[{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }],
		class: [Number],
		name: String,
		age: Number,
		gender: Boolean,
		description: String,
		replies : [replySchema],
	});


******/


	//Query를 보내면,쿼리에 해당하는 profile에 해당하는 것들을 내보내고
	//Query가 없으면 모든 profile을 내보낸다.
	app.get('/api/profile', function(req, res, next){
		Profile.find(req.query)
			.populate('school')
			.exec(function(err, profiles){
				if(err) return next(err);
				res.json(profiles.map(function(a){
					return {
						id: a._id,
						school: a.school,
						class: a.class,
						name: a.name,
						age: a.age,
						gender: a.gender,
						description: a.description,
						replies : a.replies,
					};
				}));
			});
	});

	//요청본문에 해당하는 profile을 새로 생성한다.
	//검증과정이 있어야하는데, 어떤게 필수일까 name, age, gender은 필수로 하자!
	//DOLATER school중 하나도 있어야한다.
	app.post('/api/profile', function(req, res, next){
		if(req.body.name && req.body.age && req.body.gender){
			Profile.create(req.body, function(err, profile){
				if(err) return next(err);
				res.json({
					success: true,
					id: profile._id,
					school: profile.school,
					class: profile.class,
					name: profile.name,
					age: profile.age,
					gender: profile.gender,
					description: profile.description,
					replies : profile.replies,
				});
			});
		}
	})


	//해당 id의 profile을 available상태로 만들고 응답은 success를 담아준다.
	app.get('/api/profile/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		Profile.findById({_id: req.params.id}, function(err, profile){
			if(err) console.error(err);
			/*DOLATER err 처리 */
			if(!profile){
				return res.json({
					success: false,
					message: 'NO DATA',
				});
			};
			return res.json({
				success: true,
				id: profile._id,
				school: profile.school,
				class: profile.class,
				name: profile.name,
				age: profile.age,
				gender: profile.gender,
				description: profile.description,
				replies : profile.replies,
			});
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
		//DOLATER - 업데이트 메커니즘 적용 및 업데이트 검증.
		/*if(req.session.upCnt > 10){
			return res.json({
				success: false,
				message: "죄송합니다 이미 단일 연결 업데이트 제한 횟수를 넘어갔습니다. 가입을 통해 제한 없는 더 자유로운 활동을 해보세요!"
			});
		}*/
		Profile.update({_id: req.params.id}, req.body, function(err, response){
			if(err) return next(err);
			res.json({
				success: true
			});
		})

	})



}