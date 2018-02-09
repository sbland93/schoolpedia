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
				alert('Error Occured Here');
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



//ajax로 profile의 content(features, 를 UP(+1) or DOWN(-1)해주는 함수.
//data에 target과 targetId와 upOrDown를 담아 보내준다.
var upDownProfile = function(id, data){
	console.log("target: ", data.target);
	console.log("targetId: ", data.targetId);
	console.log("upOrDown: ", data.upOrDown);
	return new Promise(function(resolve, reject){
		$.ajax({
			url: '/api/profile' + '/' + id + '/updown',
			method: 'PUT',
			data : data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
}

var searchProfiles = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: '/api/profile' + '/search',
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
}