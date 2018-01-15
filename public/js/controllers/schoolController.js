//학교페이지 controller.

$(document).ready(function(){

	var updateDescriptionForm = TPL.updateDescription;
	var searchedProfileList = TPL.searchedProfileList;

	//소개글 수정 버튼을 클릭하면, 동적으로 소개글 수정 Form이 생성된다.
	$('#updateDescription').on('click', function(evt){
		evt.preventDefault();
		$('#updateDescriptionDiv').html(updateDescriptionForm());

		//(동적생성된)학교소개문 업데이트 폼을 위한 폼검증.
		$(".updateSchoolForm").validate({
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
				var sendingData = $(form).serialize();
				
				//업데이트 성공시에(교문생성시) 열린 학교의 게시판 페이지로 옮겨준다.
				updateSchool(defaultSchoolId, sendingData).then(function(data){
					if(data.success){
						alert("수정되었습니다ㅎㅎ");
						$('#schoolDescription').html($('#fieldDescription').val());
						$('#updateDescriptionDiv').html('');
					} 
					else{
						alert('Error Occured1');
					}
				}).catch(function(err){
					alert(err);
				});
			
			}
		});

		$('#cancelUpdateDescription').on('click', function(evt){
			$('#updateDescriptionDiv').html('');
		});

	});

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
				console.log("data:", data);
				//기본학교아이디를, 가지고, 템플릿으로 보내야 학생프로필 생성에, 학교 아이디를 가지고 들어갈 수 있다.
				var defaultSchoolId = $('#schoolId').val();
				if(data.length){
					return $('#searchResult').html(searchedProfileList({
						searchedList : data,
						schoolId : defaultSchoolId, 
					}));
				} 
				if(!data.success) return $('#searchResult').html(searchedProfileList({
					noData : true,
					schoolId : defaultSchoolId, 
				}));
			}).catch(function(err){
				alert(err);
			});
		}
	});
	

});