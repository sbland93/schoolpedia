module.exports = function(profile){
	return {
		id: profile._id,
		highSchool: profile.highSchool,
		middleSchool: profile.middleSchool,
		elementarySchool: profile.elementarySchool,
		highClass: profile.highClass,
		middleClass: profile.middleClass,
		elementaryClass: profile.elementaryClass,
		name: profile.name,
		age: profile.age,
		gender: profile.gender,
		stories: profile.stories,
		description: profile.description,
		replies : profile.replies,
		updated_at: profile.updated_at,
	};
};
