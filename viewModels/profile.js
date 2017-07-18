module.exports = function(profile){
	return {
		id: profile._id,
		highSchool: profile.highSchool,
		middleSchool: profile.middleSchool,
		elementarySchool: profile.elementarySchool,
		class: profile.class,
		name: profile.name,
		age: profile.age,
		gender: profile.gender,
		description: profile.description,
		replies : profile.replies,
		updated_at: profile.updated_at,
	};
};