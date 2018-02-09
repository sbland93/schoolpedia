
$(document).ready(function(){
	var userId = $(".userId").val();
	$(".myControllPageForm").validate({
		rules:{
			password: {
	          required: true,
	          minlength: 6,
	          maxlength: 20
	        },
	        graduation:{
	        	required: true,
	        	min: 1950,
	        }
		},
		messages:{
			password: "비밀번호는 6글자 이상 20글자 이하 필수입니다리",
			graduation: "1950년 이후로 선택",
		},
		submitHandler:function(form,evt){
			console.log();
			evt.preventDefault();
			var sendingdata = $(form).serialize();
			updateUser(userId,sendingdata).then(function(data){
				if (data.success){
					console.log('hi');
					alert("수정되었습니다.");
					location.href = '/'
				}

			})
		},
	})
});