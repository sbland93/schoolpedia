module.exports = function(info){
	return {
		id: info._id,
		title: info.title,
		content: info.content,
		updated_at: info.updated_at,
	};
};