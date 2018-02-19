
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

	//학생검색시에, validate할 것.
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
			//기본적으로 열려는 학교의 아이디를 가져오고, 교문을 연다는 것은, 학교의 avilable을 true로 만든다는것이므로, 추가해준다.
			var unindexed_array = $(form).serializeArray();

		    var searchData = {};

		    $.map(unindexed_array, function(n, i){
		        searchData[n['name']] = n['value'];
		    });

			console.log("searchData :", searchData);
			var PSsearchedProfiles = TPL.PSsearchedProfiles;
			searchProfilesTest(searchData).then(function(data){
				if(data.success) {
					console.log(data);
					$("#searchedFriendsTPL").html(PSsearchedProfiles({
						profileList:data.profileList,
					}))
				}
			});

		}
	});


});