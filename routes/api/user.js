var User = require('../../models/user.js');
var userViewModel = require('../../viewModels/user.js');



module.exports = function(app){


/******


	api 계획

	api/user?query - get -> if(!query) user를 모두 가져온다.
	if(query) 해당쿼리에 해당하는 모든 user를 꺼내온다.(보통 이름으로 조사하게 될것.) 
	(성공응답: data Array를 보낸다.)

	api/user- post -> 요청 본문의 user를 추가한다.
	(성공 응답: data.id를 보낸다./ data.success)
	
	api/user/:id - get -> 해당 id의 user를 하나 가져온다.
	(성공 응답: 해당 data를 보낸다. / data.success)

	api/user/:id - delete -> 해당 id의 user 삭제.
	(성공 응답: data.success)

******/


	//Query를 보내면,쿼리에 해당하는 user에 해당하는 것들을 내보내고
	//Query가 없으면 모든 User를 내보낸다.
	app.get('/api/user', function(req, res, next){
		
		User.find(req.query)
			.exec(function(err, users){
				if(err) return next(err);
				res.json(users.map(userViewModel));
			});
	});

	//요청본문에 해당하는 user를 새로 생성한다.
	//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
	app.post('/api/user', function(req, res, next){
		if(req.body.name && req.body.email && req.body.password){
			User.create(req.body, function(err, user){
				if(err) return next(err);
				res.json({
					success: true,
					id: user._id,
				});
			});
		}else{
			res.json({
				success: false,
				message: 'TITLE CONTENT SCHOOL REQUIRED',
			});
		}
	})


	//해당 id의 user를 available상태로 만들고 응답은 success를 담아준다.
	app.get('/api/user/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		User.findById({_id: req.params.id}, function(err, user){
			if(err) console.error(err);
			/*DOLATER err 처리 */
			if(!user){
				return res.json({
					success: false,
					message: 'NO DATA',
				});
			};
			return res.json(userViewModel(user));
		});
	});


	//id에 해당하는 user를 삭제한다.
	app.delete('/api/user/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		User.remove({_id: req.params.id}, function(err){
			if(err) return next(err);
			res.json({
				success: true,
			});
		});
	});


	//id에 해당하는 user를 요청본문을 토대로 업데이트한다.
	app.put('/api/user/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		//DOLATER - 업데이트 메커니즘 적용 및 업데이트 검증.
		User.update({_id: req.params.id}, req.body, function(err, response){
			if(err) return next(err);
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



}