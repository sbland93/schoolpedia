module.exports = function(profile){
	return {
		success: true,
		id: profile._id,
		schools: profile.schools,
		graduation: profile.graduation,
		bugName: profile.bugName,
		feature: profile.feature,
		name: profile.name,
		age: profile.age,
		gender: profile.gender,
		stories: profile.stories,
		description: profile.description,
		replies : profile.replies,
		updated_at: profile.updated_at,
	};
};
