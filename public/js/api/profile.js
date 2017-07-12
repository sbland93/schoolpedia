var baseProfile = "/api/profile";

var getProfiles = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseProfile,
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

var getProfile = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseProfile + '/' + id,
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

var addProfile = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseProfile,
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

var deleteProfile = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseProfile + '/' + id,
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

var updateProfile = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseProfile + '/' + id,
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