
$(document).ready(function(){

	//
	$(".searchProfilesForm").validate({
		// Specify validation rules
		rules: {
			q:{
				required: true,
				minlength: 1,
			}
		},
		// Specify validation error messages
		messages: {
			q: "최소한글자의 검색내용이 필요합니다",
		},
		submitHandler: function(form, evt) {
			evt.preventDefault();
			//기본적으로 열려는 학교의 아이디를 가져오고, 교문을 연다는 것은, 학교의 avilable을 true로 만든다는것이므로, 추가해준다.
			var unindexed_array = $(form).serializeArray();

		    var searchData = {};

		    $.map(unindexed_array, function(n, i){
		        searchData[n['name']] = n['value'];
		    });

			console.log("searchData :", searchData);

			searchProfiles(searchData).then(function(data){
				if(data.success) console.log(data);
			});

		}
	});


});