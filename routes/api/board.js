var Board = require('../../models/board.js');
var User = require('../../models/user.js');
var boardViewModel = require('../../viewModels/board.js');
var authHandlers = require('../../handlers/auth.js')();

module.exports = function(app){

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
		
	
		Board.find().and(query)
			.populate('school')
			.exec(function(err, boards){
				if(err) return next(err);
				res.json(boards.map(boardViewModel));
			});
	});

	//요청본문에 해당하는 board을 새로 생성한다.
	//검증과정이 있어야하는데, title, content, school이 필수로 들어가야한다.
	//또한, user의 데이터베이스에 그 게시글 id를 넣어두어야 한다.
	app.post('/api/board', authHandlers.ajaxIsLoggedIn , function(req, res, next){
		if(req.body.title && req.body.content && req.body.school && req.user){
			req.body.owner = req.user._id; //글작성 유저를 추가한다.
			if(req.body.anonym === "on"){ //글이 익명이라면 user의 anonym(익명 식별자)를 적어주고,
				req.body.writer = req.user.anonym;
			}else{ //글이 익명이 아니라면 실명을 담아준다.
				req.body.writer = req.user.name;
			}
			delete req.body.anonym;
			
			Board.create(req.body, function(err, board){
				if(err) return next(err);
				User.update({_id: req.user._id}, {$push: {boards : board._id }}, function(err, response){
					if(err) return next(err);
					if(response.nModified === 1){
						res.json({
							success: true,
							id: board._id,
						});
					} else {
						res.json({
							success: false,
							message: ''
						});
					}
				});
			});
		}else{
			res.json({
				success: false,
				message: 'TITLE CONTENT SCHOOL REQUIRED',
			});
		}
	});


	//해당 id의 board을 available상태로 만들고 응답은 success를 담아준다.
	app.get('/api/board/:id', function(req, res, next){
		if(!req.params.id) return next('No Id');
		Board.findById({_id: req.params.id}, function(err, board){
			if(err) console.error(err);
			/* DOLATER err 처리 */
			if(!board){
				return res.json({
					success: false,
					message: 'NO DATA',
				});
			};
			return res.json(boardViewModel(board));
		});
	});


	//로그인되어있는지 확인후, writer와 user가 일치하면
	//1. 유저의 boards(내가 쓴글)에서 삭제한다.
	//2. 유저의 boards에서 삭제가 된것을 확인한 후, 그 board를 삭제한다.
	app.delete('/api/board/:id', authHandlers.ajaxIsLoggedIn, function(req, res, next){
		if(!req.params.id) return next('No Id');
		
		Board.findById(req.params.id, function(err, board){
			if(err) return next(err);
			if(!board) return res.json({type: "Empty", success : false });
			if(board.isWriter(req.user._id)){
				User.update({_id: req.user._id}, { $pull: {"boards": board._id} }, function(err, response){
					if(err) return next(err);
					if(response.nModified === 1){
						board.remove(function(err){
							if(err) return next(err);
							res.json({
								success: true,
							});
						});						
					} else {
						res.json({
							type: "Mystery",
							success: false,
						});
					}
				});
			}else{
				res.json({ type: "Auth", success: false });
			}
		});

	});


	//id에 해당하는 board을 요청본문을 토대로 업데이트한다.
	//게시글을 수정하는것과, 댓글을다는것 => option으로 
	app.put('/api/board/:id', authHandlers.ajaxIsLoggedIn , function(req, res, next){
		if(!req.params.id) return next('No Id');
		Board.findById(req.params.id, function(err, board){
			
			if(err) return next(err);
			if(!board) return res.json({type: "Empty", success: false});
			var auth = true; //게시글 수정이 아니면, 항상 true로 두고
			if(req.body.title || req.body.content) auth = board.isWriter(req.user._id); //그것이 게시글 수정이라면, writer인지를 확인한다. 
			if(auth){
				board.update(req.body, function(err, response){
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
			}else{
				res.json({type: "Auth", success: false});
			}
		});
				
	});


	//id에 해당하는 board을 요청본문을 토대로 업데이트한다.
	app.put('/api/board/:id/updown', authHandlers.ajaxIsLoggedIn ,function(req, res, next){
		if(!req.params.id) return next('No Id');
		//DOLATER - 업데이트 메커니즘 적용 및 업데이트 검증.
		if(!req.user) return next("NO LOGGIN");


		Board.findById({_id: req.params.id}, function(err, board){
			if(err) return next(err);
			var isAlready = board.participants.some(function(element){
				return element.equals(req.user._id);
			})
			if(isAlready) return res.json({success: false, type:"Already"});
			else{
				req.body["$push"] = {participants : req.user._id};
				board.update(req.body, function(err, response){
					if(err) return next(err);
					if(response.nModified === 1){
						res.json({
							success: true,
							id: req.params.id,
						});
					} else {
						res.json({
							type: "Login",
							success: false,
						});
					}
				});
			}

		});


	});



}