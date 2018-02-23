
//학교게시물 검색 form
$(".searchBoardForm").validate({

	rules: {
		q: {
			required: true,
			minlength: 2,
			maxlength: 10,
		}
	},

	messages : {
		q: "검색내용은 최소 두글자 최대 열글자다리",
	},

	submitHandler : function(form, evt){
		evt.preventDefault();

		var sendingData = $(form).serialize();
		getBoards(sendingData).then(function(data){
			var template = TPL.SBsearchedBoards;
			$("#searchedBoardsTPL").html(template({ boardList : data }));
		});

	}

})