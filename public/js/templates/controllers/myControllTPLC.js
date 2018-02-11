

//newsFeed View에서 사용하는 동적 Template의 Controller.
//클로저 활용을 위하여, 함수를 리턴한다.
var myControllTPLC = {

	updatePassword: function(){
		
		return function(){
			//사용자 관리 페이지에 비밀번호 변경버튼을 클릭시에 생기는 Form
			$(".updatePasswordForm").validate({
				rules:{
					password: {
			          required: true,
			          minlength: 6,
			          maxlength: 20
			        },
			        
			        passwordConf: {
			          required: true,
			          equalTo: "#fieldPassword"
			        },
				},
				messages:{
					password: "비밀번호는 6글자 이상 20글자 이하 필수입니다리",
        			passwordConf: "비밀번호와 비밀번호 확인이 다른 것 같습니다리",
				},
				submitHandler:function(form , evt){
					evt.preventDefault();
					var newPassword = $("#fieldPassword").val();
					updateUser({$set: {password: newPassword}}).then(function(data){
						if(data.success){
							alert("변경되었습니다.");
						}else{
							alert("문제가 생겼습니다.");
						}
						$("#updatePasswordTPL").html("");
					})
				}
			});

			$("#cancelUpdatePassword").on('click',function(evt){
				evt.preventDefault();
				$("#updatePasswordTPL").html("");
			}); 
		}
	},

}