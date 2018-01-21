
$(document).ready(function(){
	
	var NPsearchedProfileList = TPL.NPOsearchedProfileList;

	//학생검색을 위한 Form 검증.
	$(".searchProfileForm").validate({
		// Specify validation rules
		rules: {
			name:{
				required: true,
				minlength: 1,
				maxlength: 5,
			}
		},
		// Specify validation error messages
		messages: {
			name: "이름은 한글자 이상 다섯글자 이하 입니다리",
		},
		submitHandler: function(form) {
			//검색내용을 serialize 한다.
			var sendingData = $(form).serialize();
			
			//검색내용에 해당하는 프로필을 ajax로 가져오고 결과에 해당하는 템플릿을 동적생성.
			getProfiles(sendingData).then(function(data){
				//기본학교아이디를, 가지고, 템플릿으로 보내야 학생프로필 생성에, 학교 아이디를 가지고 들어갈 수 있다.
				var defaultSchoolId = $('#schoolId').val();
				if(data.length){
					return $('#searchedProfileListTPL').html(NPsearchedProfileList({
						searchedList : data,
						schoolId : defaultSchoolId, 
					}));
				} 
				if(!data.success) return $('#searchedProfileListTPL').html(NPsearchedProfileList({
					noData : true,
					schoolId : defaultSchoolId, 
				}));
			}).catch(function(err){
				alert(err);
			});
		}
	});

});


