var Board = require('../../models/board.js');
var Profile = require('../../models/profile.js');
var authHandlers = require('../../handlers/auth.js')();
var User = require('../../models/user.js');

module.exports = function(app){
	//admin페이지 delete.
	app.delete('/api/admin/board/:id', authHandlers.isAdmin, function(req, res, next){
		if(!req.params.id) return next('No Id');
		Board.findById(req.params.id, function(err, board){
			if(err) return next(err);
			if(!board) return res.json({type: "Empty", success : false });
			board.remove(function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});						
		});

	});

	app.delete('/api/admin/profile/:id', authHandlers.isAdmin, function(req,res,next){
		if (!req.params.id) return next('No Id');
		Profile.findById(req.params.id, function(err, profile){
			if(err) return next(err);
			if(!profile) return res.json({type: "Empty", success : false});
			profile.remove(function(err){
				if(err) return next(err);
				res.json({
					success:true,
				});
			});
		});
	});

	app.post('/api/admin/board', authHandlers.isAdmin, function(req, res, next){
		if(req.body.title && req.body.content && req.body.school && req.user){
			req.body.owner = req.user._id; //글작성 유저를 추가한다.
			if(req.body.anonym === "on"){ //글이 익명이라면 user의 anonym(익명 식별자)를 적어주고,
				req.body.writer = req.user.generateRandomAnonym();
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
}