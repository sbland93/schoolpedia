module.exports = function(school){
	return {
		id: school._id,
		name: school.name,
		location: school.location,
		updated_at : school.updated_at,
		description: school.description,
		category: school.category,
		available: school.available,
	};
}