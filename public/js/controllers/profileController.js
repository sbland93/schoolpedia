var profileId = $('#PPdefaultValue').attr('profileId');
$('#removeProfile').on('click', function(evt){
	evt.preventDefault();
	deleteProfile(profileId).then(function(data){
		if(data.success) location.href = document.referrer;
		else alert('Error occured');
	}).catch(function(){
		alert('Error occured');
	});
});
$('#addStory').on('click', function(evt){
	evt.preventDefault();
	var newStoryContent = $('#newStory').val();
	updateProfile(profileId, {$push: {stories:{content: newStoryContent}}})
	.then(function(data){
		//DOLATER 추가에에대한 Mechanism And Data.success에대한 !처리도 어떻게 해야할지 생각해보자
		//DOLATER TEMPLATE CONTROLLER 분리.
		if(data.success){
			console.log($('.storyContents').last());
			$('#profileStories').append(newStoryContent);
		}
	});
});