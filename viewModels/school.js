module.exports = function(school, seperate){

	if(seperate) {
		var returnValue = {
			id: school._id,
			name: school.name,
			location: school.location,
			updated_at : school.updated_at,
			category: school.category,
			available: school.available,
		}

		switch(school.category){
			case 'highSchool':
				returnValue.highSchool = school.name;
				break;
			case 'middleSchool':
				returnValue.middleSchool = school.name;
				break;
			case 'elementarySchool':
				returnValue.elementarySchool = school.name;
				break;
		}

		return returnValue;
	}

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