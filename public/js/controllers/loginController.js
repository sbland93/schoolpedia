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

			/*//form전송을 막는다.
			evt.preventDefault();

			//검색내용을 serialize 한다.
			var sendingData = $(form).serialize();

			//검색내용에 해당하는 프로필을 ajax로 가져오고 결과에 해당하는 템플릿을 동적생성.
			ajaxLogin(sendingData).then(function(data){
				console.log("data:", data);
				//기본학교아이디를, 가지고, 템플릿으로 보내야 학생프로필 생성에, 학교 아이디를 가지고 들어갈 수 있다.
				if(data.success){
					console.log("Login!");
					location.href = document.referrer;
				}
			}).catch(function(err){
				alert(err);
			});*/
		}
	});
	

});