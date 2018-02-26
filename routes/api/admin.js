var Board = require('../../models/board.js');
var Profile = require('../../models/profile.js');
var authHandlers = require('../../handlers/auth.js')();

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
}