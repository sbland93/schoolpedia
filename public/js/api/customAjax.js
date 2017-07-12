//mehtod, url, data, cb1, cb2

/*
var customAjax = function(base, method, id, data){
	var url;
	if(id === true){ url = base + '/' + id}
	else{ url = base }
	return function(id, data){
		return new Promise(function(resolve, reject){
			$.ajax({
				url: url,
				method: method,
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
}*/