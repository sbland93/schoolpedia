
//profile.handlebars view에서 필요한 TPL에 대한 Controllers.
var profileTPLC = {
	
	addFeature : function(){
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
						//$('#profileStories').append(newFeature);
						alert("추가되었습니다");
						$("#addFeatureTPL").html("");
						response.features.unshift({features: { feature: newFeature }});
						var featureData = $(response.features);
						makePosts(featureData, tplAndContext.features);
					} else{
						//TODO
					}
				});
			}
		
		});
	}

}


















