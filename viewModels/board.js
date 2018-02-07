module.exports = function(board){
	return {
		success: true,
		id: board._id,
		owner: board.owner,
		writer: board.writer,
		title: board.title,
		school: board.school,
		content: board.content,
		replies : board.replies,
		updated_at: board.updated_at,
		up: board.up,
		down: board.down,
	};
};