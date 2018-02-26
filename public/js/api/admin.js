var baseUrl = "/api/admin";
//게시물 모두 
var adminGetBoards = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUrl,
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
var adminGetBoard = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUrl + '/' + id,
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

var adminAddBoard = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUrl,
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
//관리자 페이지 board삭제.
var adminDeleteBoard = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUrl + '/' + id,
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

var adminUpdateBoard = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUrl + '/' + id,
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

