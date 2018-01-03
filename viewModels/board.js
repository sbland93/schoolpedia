module.exports = function(board){
	return {
		id: board._id,
		title: board.title,
		school: board.school,
		content: board.content,
		replies : board.replies,
		updated_at: board.updated_at,
		up: board.up,
		down: board.down,
	};
};