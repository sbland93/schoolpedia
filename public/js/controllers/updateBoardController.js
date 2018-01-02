$(document).ready(function(){
	var updateBoardId = $('#updateBoardForm').attr('boardId');
	$('#updateBoardForm').on('submit', function(evt){
		evt.preventDefault();
		updateBoard(updateBoardId , $(this).serialize()).then(function(data){
			if(data.success) location.href = '/board/' + data.id;
			else{
				alert('Error Occured');
			}
		}).catch(function(){
			alert('Error Occured');
		});
	});
});