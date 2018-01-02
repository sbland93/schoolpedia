
//Home Controller
$(document).ready(function(){

	var searchedSchoolList = TPL.HMsearchedSchools;

	$('#searchSchool').submit(function(evt){
		//stop Form from submitting normally
		console.log("Event Prevented");	
		evt.preventDefault();

		var $form = $(this),
			nameOfSchool = $form.find('input[name="name"]').val().split(' ').join(''),
			url = $form.attr('action');

		getSchools({name: nameOfSchool}).then(function(data){
			if(data.length) return $('#searchResult').html(searchedSchoolList({searchedList : data}));
			if(!data.success) return $('#searchResult').html(searchedSchoolList({noData : true}));
		});
	});


	console.log($('#idea').innerText);
});
