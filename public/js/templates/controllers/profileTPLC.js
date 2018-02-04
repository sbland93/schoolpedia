
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

			ㅋ

		}
	},


	updateSchool : function(profileId, response){

		return function(){
			$("#searchSchool").validate({
				rules:{
					name:{
						required:true,
						minlength:1,
						maxlength:10,
					}
				},
				messages:{
					name:"한글자 이상입니다."
				},
				submitHandler:function(form,evt){
					evt.preventDefault();
					var sendingData = $(form).serialize();
					getSchools(sendingData).then(function(data){
						if(data.length){
							var template2 = TPL.EPsearchedSchools;
							$("#searchedSchoolsTPL").html(template2({searchedList:data}));
							$(".sendData").on('click',function(evt){
								evt.preventDefault();
								var schoolIds = $(this).attr("schoolId");
								updateProfile(profileId, {$push: { schools: { school: schoolIds }}}).then(function(data){
									if (data.success){
										alert("수정되었습니다.");
										var inputName = $(".inputName").val();
										response.schools.push({school:{
											name:inputName,
											_id:data.id,
										}});
								
										$("#updateSchoolTPL").html("");
										$("#profileTemplate").html(TPL.EPprofile({
											profile: response,
										}));
									}
									
								})
							});
						}
					});

					

				}
			});


			$("#cancelUpdateSchool").on('click',function(evt){
				evt.preventDefault();
				$("#updateSchoolTPL").html("");
				
			});
		}
	},
	

	updateBugName: function(profileId){
		return function(){
			console.log("Here");
			$(".updateBugNameForm").validate({
				rules:{
					bugName:{
						required:true,
						minlength:2,
						maxlength:2,
					}
				},
				messages:{
					bugName:"충호는 두글자 입니다"
				},
				submitHandler:function(form,evt){
					evt.preventDefault();
					var sendingData = $(form).serialize();
					var bugName = $("#fieldBugName").val();
					updateProfile(profileId, sendingData).then(function(data){
						console.log(data);
						if(data.success){
							alert("수정되었습니다.")
							$("#updateBugNameTPL").html("");
							$(".bugName").html(bugName);
						}
					});
				}
			});

			$("#cancelUpdateBugName").on('click',function(evt){
				$("#updateBugNameTPL").html("");
			});
		}
	},


	updateClass : function(profileId, response, schoolId){

		return function(){
			$(".updateClassForm").validate({
				rules:{
					class:{
						required:true,
						
					}
				},
				messages:{
					class:"해당하는 반이 없습니다."
				},
				submitHandler:function(form,evt){
					evt.preventDefault();
					var first = $(".1").val();
					var second = $(".2").val();
					var third = $(".3").val();
						//수정된 반 정보를 보낼 데이터 안에 입력.
						var classData = { 
						
							$set: {
								"schools.$.class.0" : first,
								"schools.$.class.1" : second,
								"schools.$.class.2" : third
							} ,

						schoolId: schoolId,

						options: "class",
						
					}
					var updateSchool;
					updateProfile(profileId,classData).then(function(data){
						response.schools.map(function(ele){
							if (ele.school._id === schoolId){
								updateSchool = ele;
							}
						})
						console.log(updateSchool.class);
						updateSchool.class[0]=first;
						updateSchool.class[1]=second;
						updateSchool.class[2]=third;
						
						if (data.success){
							alert("수정되었습니다.");
							$("#updateClassTPL").html("");
							/*response.schools.set({school:{
								"schools.$.class.0" : first,
								"schools.$.class.1" : second,
								"schools.$.class.2" : third
							}});
							*/
							
							$("#profileTemplate").html(TPL.EPprofile({
								profile:response,
							}));
						}
					})
				}
			});

			$("#cancelUpdateClass").on('click',function(evt){
				evt.preventDefault();
				$("#updateClassTPL").html("");
			});	


		}
	},


}


















