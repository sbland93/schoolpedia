

$(document).ready(function(){
	
	//취소버튼을 누르면 뒤로 가는 controller
	$('.goBack').on('click', function(evt){
		evt.preventDefault();
		location.href = document.referrer;
	});



	// Initialize form validation on the registration form.
	// It has the name attribute "registration"
	$(".newProfileForm").validate({
		// Specify validation rules
		rules: {
			//학생 이름 최소 2글자 최대 4글자 필수.
			name: {
				required: true,
				minlength: 2,
				maxlength: 4,
			},

			gender: {
				required: true,
			},

			feature: {
				required: true,
				minlength: 2,
				maxlength: 50,
			},

			graduation: {
				required: true,
				min: 1950,
			}
		},
		// Specify validation error messages
		messages: {
			name: "(두글자 이상 네글자 이하) 이름은 필수입니다리 ",

			gender: "성별은 필수입니다리",

			feature: "(두글자 이상 오십글자 이하) 특징은 필수입니다리",

			graduation: "졸업년도 선택은 필수 입니다리",
		},
		submitHandler: function(form,evt) {

			evt.preventDefault();

			//form Data를 Model에 맞는 json으로 변환하는 과정.
			var profileData = { 
				schools: [],
			};
			//model안의 schools를 다루기위한 obj.
			var schoolObjs = { school: null, class: [] };
			
			//class의 index에 따라, 100, 200, 300을 더한후 model에 맞게 변환해 보내기 위해 만든 array.
			var classIndex = ["class1", "class2", "class3", "class4", "class5", "class6"];
			var indexOfClass;

			$(form).serializeArray().map(function(a){
				//학교아이디는 schoolId의 것을 가져와서 schools.school에 넣어준다.
				if((a.name === 'schoolId')) return schoolObjs['school'] = a.value;
				//1 / 2 / 11 ==> 101/ 202 / 311로 바꾸기 위한 과정.
				if(classIndex.indexOf(a.name) !== -1) return  schoolObjs.class.push(( Number(a.value) + ((classIndex.indexOf(a.name)+1)*100) ));
				profileData[a.name] = a.value;
			});

			profileData.schools.push(schoolObjs);
			console.log(profileData);

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

