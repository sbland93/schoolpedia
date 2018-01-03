
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
<<<<<<< HEAD
=======
			console.log('here');
>>>>>>> 180102home
			if(data.length) return $('#searchResult').html(searchedSchoolList({searchedList : data}));
			if(!data.success) return $('#searchResult').html(searchedSchoolList({noData : true}));
		});
	});


<<<<<<< HEAD
=======
	console.log($('#idea').innerText);
>>>>>>> 180102home
});
