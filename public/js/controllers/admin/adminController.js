
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
	//관리자가 게시글 생성.
	$(".newBoardForm").validate({
		rules: {
			//제목은 5자 이상, 25자 이하.
			title:{
				required: true,
				minlength: 3,
				maxlength: 25,
			},
			content:{
				required: true,
				minlength: 1,
				maxlength: 500,
			}
		},
		// Specify validation error messages
		messages: {
			title: "제목은 3글자 이상, 25글자 이하로 적어줘",
			content: "내용은 1글자 이상, 500글자 이하로 적어줘",
		},
		//글생성 버튼을 클릭시 글 생성후, 관리자페이지로 이동.
		submitHandler: function(form) {
			//textarea br 처리
			var contents = $(form).serializeObject();
			replaceBr(contents , "content");
			adminAddBoard(contents).then(function(data){
				if(data.success) location.href = '/admin';
				else{
					alert('Error Occured');
				}
			}).catch(function(){
				alert('Error Occured');
			});
		}
	})
})