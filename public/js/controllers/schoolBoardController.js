$(".searchBoardForm").validate({
	rules:{
		q:{
			required:true,
			minlength:2,
			maxlength:10,

		}
	},
	messages:{
		q:"검색 내용은 최소 2글자 최대 10글자"
	},
	submitHandler:function(form,evt){
		evt.preventDefault();
		var sendingData = $(form).serialize();
		getBoards(sendingData).then(function(data){
			console.log(data);
			var template = TPL.SBsearchedBoards;
			$("#searchedBoardsTPL").html(template({
				boardList:data,
			}))
			
		});


	}
})