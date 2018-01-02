module.exports = function(profile){
	return {
		id: profile._id,
		schools: profile.schools,
		name: profile.name,
		age: profile.age,
		gender: profile.gender,
		stories: profile.stories,
		description: profile.description,
		replies : profile.replies,
		updated_at: profile.updated_at,
	};
};
