	
$(document).ready(function(){

	// Initialize form validation on the registration form.
	// It has the name attribute "registration"
	$(".newSchoolForm").validate({
		// Specify validation rules
		rules: {
			description:{
				required: true,
				minlength: 5,
				maxlength: 5,
			}
		},
		// Specify validation error messages
		messages: {
			description: "다섯글자의 학교소개문 적즈아아아!",
		},
		submitHandler: function(form) {
			//기본적으로 열려는 학교의 아이디를 가져오고, 교문을 연다는 것은, 학교의 avilable을 true로 만든다는것이므로, 추가해준다.
			var defaultSchoolId = $('#schoolId').val();
			var sendingData = $(form).serialize() + "&available="+true;
			
			//업데이트 성공시에(교문생성시) 열린 학교의 게시판 페이지로 옮겨준다.
			updateSchool(defaultSchoolId, sendingData).then(function(data){
				if(data.success){
					alert('교문이 열렸어요. 더많은 친구들의 정보를 업데이트하고 함께 즐겨요.');
					location.href = '/school/' + defaultSchoolId;
				} 
				else{
					alert('Error Occured1');
				}
			}).catch(function(err){
				alert(err);
			});
		}
	});


});