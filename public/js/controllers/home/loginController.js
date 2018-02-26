$(document).ready(function(){

	//학생검색을 위한 Form 검증.
	$(".loginForm").validate({
		// Specify validation rules
		rules: {
			email:{
				required: true,
				email: true,
			},
			password: {
				required: true,
				minlength: 6,
			}
		},
		// Specify validation error messages
		messages: {
			email: "이메일 형식 ex)schoolchoong@gmail.com",
			password: "비밀번호는 필수입니다. 최소 6자."
		},
		submitHandler: function(form, evt) {
			evt.preventDefault();
			form.submit();
		}
	});
	

});