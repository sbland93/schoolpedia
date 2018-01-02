var baseSchool = "/api/school";

var getSchools = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseSchool,
			method: 'GET',
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var getSchool = function(id){
	return new Promise(function(resolve, reject){

		$.ajax({
			url: baseSchool + '/' + id,
			method: 'GET',
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var addSchool = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseSchool,
			method: 'POST',
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var deleteSchool = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseSchool + '/' + id,
			method: 'DELETE',
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var updateSchool = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseSchool + '/' + id,
			method: 'PUT',
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};