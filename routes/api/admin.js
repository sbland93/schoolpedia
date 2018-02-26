var Board = require('../../models/board.js');
var authHandlers = require('../../handlers/auth.js')();

module.exports = function(app){
	//admin페이지 delete
	app.delete('/api/admin/:id', authHandlers.isAdmin, function(req, res, next){
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
}