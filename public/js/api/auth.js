


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