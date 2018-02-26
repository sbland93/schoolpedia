
var ajaxSignup = function(data){
	return new Promise(function(resolve, reject){		
		$.ajax({
			url: '/register',
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

var ajaxLogin = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: '/login',
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

//로그인 여부, 유저객체 정보 등을 받아오는 ajax
var ajaxAuth = function(){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: '/authInfo',
			method: 'GET',
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			}
		});
	});

}