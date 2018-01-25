

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

		console.log(sendingData);

		getBoards(sendingData).then(function(data){
			console.log(data);
			var template = TPL.SBsearchedBoards;
			console.log(template);
			$("#searchedBoardsTPL").html(template({ boardList : data }));
		});

	}



})