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


/*app.User.find().or([{ 'firstName': { $regex: re }}, { 'lastName': { $regex: re }}]).sort('title', 1).exec(function(err, users) {
    res.json(JSON.stringify(users));
});
Test.find()
      .and([
          { $or: [{a: 1}, {b: 1}] },
          { $or: [{c: 1}, {d: 1}] }
      ])*/

	//Query를 보내면,쿼리에 해당하는 board에 해당하는 것들을 내보내고
	//Query가 없으면 모든 board을 내보낸다.
	/*query에 options가 담겨오는데, school: here or all 이고 fields: title or all 이다.*/
	app.get('/api/board', function(req, res, next){
		//options가 있으면, 해당하는 option로 query로 변경해주고 검색해준다.
		var re = new RegExp('^'+req.query.q);
		var query = [ { $or: [{title: re}]} ];
		
		if(req.query.field == "all"){
			query[0].$or.push({content: re});
		}

		if(req.query.school == "here"){
			query.push({school : req.query.schoolId});	
		}
		
		console.log(query);	
		console.log(query[0].$or);	

		Board.find().and(query)
			.populate('school')
			.exec(function(err, boards){
				if(err) return next(err);
				res.json(boards.map(function(a){
					return {
						title: a.title,
						id: a._id,
						title: a.title,
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
				});
			});
		}else{
			res.json({
				success: false,
				message: 'TITLE CONTENT SCHOOL REQUIRED',
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
		});
	});


	//id에 해당하는 board을 요청본문을 토대로 업데이트한다.
	app.put('/api/board/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		//DOLATER - 업데이트 메커니즘 적용 및 업데이트 검증.
		Board.update({_id: req.params.id}, req.body, function(err, response){
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