
//profile.handlebars view에서 필요한 TPL에 대한 Controllers.
var profileTPLC = {
	
	addFeature : function(profileId, response, tplAndContext){
		return function(){
		
			//addFeatureForm 검증
			$(".addFeatureForm").validate({
				// Specify validation rules
				rules: {
					feature:{
						required: true,
						minlength: 2,
						maxlength: 50,
					}
				},
				// Specify validation error messages
				messages: {
					feature: "특징은 두글자이상 오십글자 이하 입니다리",
				},
				//추가성공시에, 특징추가 동적생성 Form을 없앤다.
				submitHandler: function(form, evt) {
					evt.preventDefault();
					var newFeature = $('#fieldFeature').val();
					updateProfile(profileId, {$push: {features : { feature: newFeature }}})
					.then(function(data){
						if(data.success){
							alert("추가되었습니다");
							$("#addFeatureTPL").html("");
							response.features.unshift({ feature: newFeature });
							var featureData = $(response.features);
							makePosts(featureData, tplAndContext.features);
						} else{
							//TODO
						}
					});
				}
			});

			$('#cancelAddFeature').on('click', function(evt){
				$('#addFeatureTPL').html("");
			});

		}
	},


	addStory : function(profileId, response, tplAndContext){
		
		return function(){
		
			//addStoryForm 검증
			$(".addStoryForm").validate({
				// Specify validation rules
				rules: {
					story:{
						required: true,
						minlength: 10,
						maxlength: 500,
					}
				},
				// Specify validation error messages
				messages: {
					story: "썰은 열자 이상 오백자 이하 입니다리",
				},
				//추가성공시에, 특징추가 동적생성 Form을 없앤다.
				submitHandler: function(form, evt) {
					evt.preventDefault();
					var newStory = $('#fieldStory').val();
					updateProfile(profileId, {$push: {stories : { content: newStory }}})
					.then(function(data){
						if(data.success){
							alert("추가되었습니다");
							$("#addStoryTPL").html("");
							response.stories.unshift({ content: newStory });
							var sotryData = $(response.stories);
							makePosts(sotryData, tplAndContext.stories);
						} else{
							//TODO
						}
					});
				}
			});

			$('#cancelAddStory').on('click', function(evt){
				$('#addStoryTPL').html("");
			});

		}
	
	},


	addReply : function(profileId, response, tplAndContext){
		
		return function(){
		
			//addReplyForm 검증
			$(".addReplyForm").validate({
				// Specify validation rules
				rules: {
					reply:{
						required: true,
						minlength: 5,
						maxlength: 100,
					}
				},
				// Specify validation error messages
				messages: {
					reply: "방명록은 다섯글자 이상 백글자 이하 입니다리",
				},
				//추가성공시에, 특징추가 동적생성 Form을 없앤다.
				submitHandler: function(form, evt) {
					evt.preventDefault();
					var newReply = $('#fieldReply').val();
					updateProfile(profileId, {$push: {replies : { content: newReply }}})
					.then(function(data){
						if(data.success){
							alert("추가되었습니다");
							$("#addReplyTPL").html("");
							response.replies.unshift({ content: newReply });
							var replyData = $(response.replies);
							makePosts(replyData, tplAndContext.replies);
						} else{
							//TODO
						}
					});
				}
			});

			$('#cancelAddReply').on('click', function(evt){
				$('#addReplyTPL').html("");
			});

		}
	
	},







}


















