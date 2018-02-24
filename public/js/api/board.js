var baseBoard = "/api/board";
//게시물 모두 
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
//해당하는 게시물만 
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

