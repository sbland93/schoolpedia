var baseUser = "/api/user";

var getUsers = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUser,
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

var getUser = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUser + '/' + id,
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

var addUser = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUser,
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

var deleteUser = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUser + '/' + id,
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

var updateUser = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUser + '/' + id,
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

