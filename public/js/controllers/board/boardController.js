//학교페이지의 컨트롤러, 기능부분.

$(document).ready(function(){

	//userInfo담는다. 댓글달때 쓸것.
	var userInfo;
	ajaxAuth().then(function(data){
		userInfo = data.userInfo;
	});

	//각 게시글의 아이디를 받는다.
	var boardId = $('#eachBoard').attr('boardId');

	//삭제버튼을 클릭시의 이벤트 처리.
	$('#removeEachBoard').on('click', function(evt){
		var self = $(this);
		evt.preventDefault();

		//삭제 확인후, 확인버튼 클릭시에, 삭제 진행후에, 게시물이 속해있던 학교페이지로 이동한다.
		var deleteConfirm = confirm("정말로 삭제하시겠습니까?");

		if(deleteConfirm){
			deleteBoard(boardId).then(function(data){
				if(data.success){
					alert("삭제되었습니다");
					location.href = self.attr("redirectTo");	
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
	
	//게시물 댓글 form 동적으로 댓글 보이게.
	$(".updateReplyForm").validate({
		rules:{
			content:{
				required:true,
				minlength:5,
				maxlength:100,
			}
		},
		messages:{
			content:"5글자 이상 써주시기 바랍니다.",
		},
		submitHandler:function(form,evt){
			evt.preventDefault();
			var newReply = $("#comment").val();
			var node = document.createElement("LI");                
			var replynode = document.createTextNode(newReply);

			node.appendChild(replynode);                             
			updateBoard(boardId, {$push: { replies: { user:userInfo.id, content : newReply } } }).then(function(data){
				if (data.success){
					document.getElementById("replyList").appendChild(node);
					$("#comment").val("");
				}else{
					alert("문제가 생긴것 같아요!");
					location.reload();
				}
			});	
		}
	})




})