
$(document).ready(function(){
	
	var NPOsearchedSchools = TPL.NPOsearchedSchools;

	//학생검색을 위한 Form 검증.
	$(".searchSchoolForm").validate({
		// Specify validation rules
		rules: {
			name:{
				required: true,
				minlength: 2,
				maxlength: 7,
			}
		},
		// Specify validation error messages
		messages: {
			name: "학교이름을 두글자 이상 입력해주세요",
		},
		submitHandler: function(form) {
			//검색내용을 serialize 한다.
			var sendingData = $(form).serialize();
			
			//검색내용에 해당하는 프로필을 ajax로 가져오고 결과에 해당하는 템플릿을 동적생성.
			getSchools(sendingData).then(function(data){
				console.log("Data: ", data);
				$('#searchedSchoolsTPL').html(NPOsearchedSchools({schoolList: data.schoolList}));
			}).catch(function(err){
				alert(err);
			});
		}
	});

});


