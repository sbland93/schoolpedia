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
					alert("삭제되었습니다");
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
			var newReply = $(".newReply").val();
			var node = document.createElement("LI");                
			var replynode = document.createTextNode(newReply);

			node.appendChild(replynode);                             
			updateBoard(boardId,{options:"reply", $push:{replies:{content:newReply}}}).then(function(data){
				if (data.success){
					console.log('hi');
					console.log(newReply);
					document.getElementById("replyList").appendChild(node);

				}else{
					if (data.type === "Login"){
						alert("로그인이 필요한 서비스입니다.");
						location.href = '/login';
					}else{
						alert("잘못된 정보입니다.");
					}
				}
			});
			
		}
	})




})