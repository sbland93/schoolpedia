//학교페이지의 컨트롤러, 기능부분.

$(document).ready(function(){


	//각 게시글의 아이디를 받는다.
	var boardId = $('#eachBoard').attr('boardId');

	//삭제버튼을 클릭시의 이벤트 처리.
	$('#removeEachBoard').on('click', function(evt){

		evt.preventDefault();

		//삭제 확인후, 확인버튼 클릭시에, 삭제 진행후에, 전페이지로 이동한다.
		var deleteConfirm = confirm("정말로 삭제하시겠습니까?");

		if(deleteConfirm){
			deleteBoard(boardId).then(function(data){
				if(data.success){
					location.href = document.referrer;	
				}
				else{
					alert('Error Occured');	
				}
			}).catch(function(){alert('Error occured');});
		}else{
			return;
		}
	
	});




})