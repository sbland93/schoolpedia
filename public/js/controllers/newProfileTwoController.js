

$(document).ready(function(){
	

	// Initialize form validation on the registration form.
	// It has the name attribute "registration"
	$(".newProfileForm").validate({
		// Specify validation rules
		rules: {
			//학생 이름 최소 2글자 최대 4글자 필수.
			name: {
				koreanName: true,
			},

			gender: {
				required: true,
			},

			graduation: {
				required: true,
				min: 1950,
			}
		},
		// Specify validation error messages
		messages: {

			gender: "성별은 필수입니다리",

			graduation: "졸업년도 선택은 필수 입니다리",
		},
		submitHandler: function(form,evt) {

			evt.preventDefault();

			var profileData = $(form).serializeObject();
			
			
			//선택사항에 있는부분을 유저가 입력하지 않았다면 삭제한다.
			if(profileData['features[0][content]'] === ""){
				delete profileData['features[0][content]'];
				delete profileData['features[0][user]'];
			}

			//선택사항에 있는부분을 유저가 입력하지 않았다면 삭제한다.
			if(profileData['stories[0][content]'] === ""){
				delete profileData['stories[0][content]'];
				delete profileData['stories[0][user]'];
			}

			console.log("profileData: ", profileData);
			
			//프로필을 추가하고, 그 프로필 개인 페이지로 이동한다.
			addProfile(profileData).then(function(data){
				if(data.success){
					location.href = '/profile/' + data.id;	
				} else{
					console.log('Some Error');
				}
			}).catch(function(err){
				alert(err);
				console.error(err);
				alert('Error Occured');
			});
		
		}
	});

});

