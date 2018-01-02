var baseBoard = "/api/board";

var getBoards = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseBoard,
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

var getBoard = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseBoard + '/' + id,
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

var addBoard = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseBoard,
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

var deleteBoard = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseBoard + '/' + id,
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

var updateBoard = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseBoard + '/' + id,
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

