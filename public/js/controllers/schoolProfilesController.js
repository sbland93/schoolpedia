
$(document).ready(function(){

	//특정학교를 클릭하면, 학교이름을 입력받는 Form을 생성시킨다.
	$("#onlySchool").on('click', function(evt){
		var input = document.createElement("INPUT");
        input.setAttribute("type", "text");
        input.setAttribute("name", "schoolName");
        input.setAttribute("placeholder", "학교이름을 입력해주세요");
        $("#onlySchoolTPL").html(input);
	});

	//모든학교를 클릭하면, 특정학교시의 입력하는 학교 폼을 삭제한다.
	$("#allSchool").on('click', function(evt){
		$("#onlySchoolTPL").html("");
	});


	//searchProfileForm Validate.
	$(".searchProfilesForm").validate({
		// Specify validation rules
		rules: {
			/*q:{
				required: true,
				minlength: 1,
			}*/
		},
		// Specify validation error messages
		messages: {
			//q: "최소한글자의 검색내용이 필요합니다",
		},

		submitHandler: function(form, evt) {
			evt.preventDefault();
			var unindexed_array = $(form).serializeArray();

		    var searchData = {};

		    $.map(unindexed_array, function(n, i){
		        searchData[n['name']] = n['value'];
		    });
			var SPsearchedProfiles = TPL.SPsearchedProfiles;
			searchProfilesTest(searchData).then(function(data){
				if(data.success) {
					$("#searchedFriendsTPL").html(SPsearchedProfiles({
						profileList:data.profileList,
					}))
				}
			});

		}
	});


});