$(document).ready(function(){
	//관리자 페이지에서 board삭제.
	$(".removeBoard").on('click',function(evt){
		var boardId = $(this).attr('boardIds');
		evt.preventDefault();

		//삭제 확인후, 확인버튼 클릭시에, 삭제 진행후에, 게시물이 속해있던 학교페이지로 이동한다.
		var deleteConfirm = confirm("정말로 삭제하시겠습니까?");

		if(deleteConfirm){
			adminDeleteBoard(boardId).then(function(data){
				if(data.success){
					alert("삭제되었습니다");
					location.reload();	
				}
				else{
					console.log(data);
					alert('Error Occured');	
				}
			}).catch(function(err){console.log(err); alert('Error occured');});
		}else{
			return;
		}
	});
	//관리자 페이지에서 프로필 삭제.
	$(".removeProfile").on('click', function(evt){
		var profileId = $(this).attr('profileId');
		evt.preventDefault();
		var deleteConfirm = confirm("정말로 삭제하시겠습니까?");
		if (deleteConfirm){
			adminDeleteProfile(profileId).then(function(data){
				if(data.success) location.reload();
				else alert('Error occured');
			}).catch(function(){
				alert('Error occured');
			});
		}else{
			return;
		}
	});
})