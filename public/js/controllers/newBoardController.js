//newBoard에 대한 Controller.

//폼검증을위해 form-validation을 쓴다.
$(".newBoardForm").validate({
	// Specify validation rules
	rules: {
		//제목은 5자 이상, 25자 이하.
		title:{
			required: true,
			minlength: 5,
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
		title: "제목은 5글자 이상, 25글자 이하로 적어줘",
		content: "내용은 1글자 이상, 500글자 이하로 적어줘",
	},
	//글생성 버튼을 클릭시 글 생성후, 작성된 게시글페이지로 이동.
	submitHandler: function(form) {
		addBoard($(form).serialize()).then(function(data){
			if(data.success) location.href = '/board/' + data.id;
			else{
				alert('Error Occured');
			}
		}).catch(function(){
			alert('Error Occured');
		});
	}

});
