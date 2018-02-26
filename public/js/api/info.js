var baseInfo = "/api/info";

var getInfos = function(data){
	return new Promise(function(resolve,reject){
		$.ajax({
			url: baseInfo,
			method:'GET',
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtndata){
				reject(rtnData);
			},
		});
	});
};

var getInfo = function(id){
	return new Promise(function(resolve,reject){
		$.ajax({
			url: baseInfo + "/" + id,
			method: "GET",
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var addInfo = function(data){
	return new Promise(function(resolve,reject){
		$.ajax({
			url: baseInfo,
			method: "POST",
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

var deleteInfo = function(id){
	return new Promise(function(resolve,reject){
		$.ajax({
			url: baseInfo + "/" + id,
			method: "DELETE",
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var updateInfo = function(id, data){
	return new Promise(function(resolve,reject){
		$.ajax({
			url: baseInfo + "/" +id,
			data: data,
			method: "PUT",
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};




