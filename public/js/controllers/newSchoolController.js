	
$(document).ready(function(){

	//취소버튼을 누르면 뒤로 가는 controller
	//DOLATER 단순히 뒤로가면 안될거 같은데..
	$('.goBack').on('click', function(evt){
		evt.preventDefault();
		location.href = document.referrer;
	});


	//Form Submit Event Controller
	//교문열기 버튼을 클릭시에 해당하는 이벤트.
	$('.newSchoolForm').on('submit', function(evt){
		evt.preventDefault();
		//기본적으로 열려는 학교의 아이디를 가져오고, 교문을 연다는 것은, 학교의 avilable을 true로 만든다는것이므로, 추가해준다.
		var defaultSchoolId = $('#schoolId').val();
		var sendingData = $(this).serialize() + "&available="+true;
		
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

	});

});

