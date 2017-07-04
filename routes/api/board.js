var Board = require('../../models/board.js');



module.exports = function(app){


/******


	api 계획

	api/board?query - get -> if(!query) board을 모두 가져온다.
	if(query) 해당쿼리에 해당하는 모든 board을 꺼내온다.(보통 이름으로 조사하게 될것.) 
	(성공응답: data Array를 보낸다.)

	api/board- post -> 요청 본문의 board을 추가한다.
	(성공 응답: data.id를 보낸다./ data.success)
	
	api/board/:id - get -> 해당 id의 board을 하나 가져온다.
	(성공 응답: 해당 data를 보낸다. / data.success)

	api/board/:id - delete -> 해당 id의 board 삭제.
	(성공 응답: data.success)


	//replySchema의 subdocument.
	var replySchema = mongoose.Schema({
		user: String,
		content: String,
	});

	var boardSchema = mongoose.Schema({
		user: String,
		school: { type: mongoose.Schema.ObjectId, ref: 'School' },
		title: String,
		content: String,
		updated: { type: Date, default: Date.now },
		replies: [ replySchema ],
	});


******/


	//Query를 보내면,쿼리에 해당하는 board에 해당하는 것들을 내보내고
	//Query가 없으면 모든 board을 내보낸다.
	app.get('/api/board', function(req, res, next){
		Board.find(req.query)
			.populate('school')
			.exec(function(err, boards){
				if(err) return next(err);
				res.json(boards.map(function(a){
					return {
						id: a._id,
						school: a.school,
						content: a.content,
						replies : a.replies,
					};
				}));
			});
	});

	//요청본문에 해당하는 board을 새로 생성한다.
	//검증과정이 있어야하는데, 어떤게 필수일까 title, content, school을 필수로 하자!
	app.post('/api/board', function(req, res, next){
		if(req.body.title && req.body.content && req.body.school){
			Board.create(req.body, function(err, board){
				if(err) return next(err);
				res.json({
					success: true,
					id: board._id,
					title: board.title,
					school: board.school,
					content: board.content,
					replies : board.replies,
				});
			});
		}
	})


	//해당 id의 board을 available상태로 만들고 응답은 success를 담아준다.
	app.get('/api/board/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		Board.findById({_id: req.params.id}, function(err, board){
			if(err) console.error(err);
			/*DOLATER err 처리 */
			if(!board){
				return res.json({
					success: false,
					message: 'NO DATA',
				});
			};
			return res.json({
				success: true,
				id: board._id,
				title: board.title,
				school: board.school,
				content: board.content,
				replies : board.replies,
			});
		});
	});


	//id에 해당하는 board을 삭제한다.
	app.delete('/api/board/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		Board.remove({_id: req.params.id}, function(err){
			if(err) return next(err);
			res.json({
				success: true,
			});
		})
	});


	//id에 해당하는 board을 요청본문을 토대로 업데이트한다.
	app.put('/api/board/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		//DOLATER - 업데이트 메커니즘 적용 및 업데이트 검증.
		if(req.session.upCnt > 10){
			return res.json({
				success: false,
				message: "죄송합니다 이미 단일 연결 업데이트 제한 횟수를 넘어갔습니다. 가입을 통해 제한 없는 더 자유로운 활동을 해보세요!"
			});
		}
		Board.update({_id: req.params.id}, req.body, function(err, response){
			if(err) return next(err);
			res.json({
				success: true
			});
		})

	})



}