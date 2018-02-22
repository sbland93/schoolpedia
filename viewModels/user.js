module.exports = function(user){
	if(!user){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: user._id,
		name: user.name,
		profile: user.profile,
		anonym: user.anonym,
		boards: user.boards,
		schools: user.schools,
		graduation: user.graduation,
		up: user.up,
		down: user.down,
	};
};
