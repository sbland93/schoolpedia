
//profile.handlebars view에서 필요한 TPL에 대한 Controllers.
var profileTPLC = {

	profile: function(profileId, response){

		return function(){
			//학교링크 클릭시 템플릿 생성.
			$(".updateClass").on('click',function(evt){
				evt.preventDefault();
				var schoolId = $(this).attr("schoolId");

				var schoolObj;
				response.schools.map(function(el){
					if(el.school._id === schoolId){
						schoolObj = el;
					}
				})

				var contextHere = {
					schoolObj:schoolObj,
					profileId:profileId,
				};

				makeDynamicTPL("#updateClassTPL", TPL.EPupdateClass, contextHere, profileTPLC.updateClass(profileId, response, schoolId));

			});	
		}
		
	
	},


	
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
					updateProfile(profileId, {options: "contents", target:"features", body: newFeature})
					.then(function(data){
						if(data.success){
							console.log('hi');
							alert("추가되었습니다");
							$("#addFeatureTPL").html("");
							response.features.unshift({ feature: newFeature, up: 0, down: 0 });
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
					updateProfile(profileId, {options: "contents", target:"stories", body: newStory})
					.then(function(data){
						if(data.success){
							alert("추가되었습니다");
							$("#addStoryTPL").html("");
							response.stories.unshift({ content: newStory, up: 0, down: 0 });
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


	addReply : function(profileId, response, tplAndContext, userInfo){
		
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
					updateProfile(profileId, {options: "contents", target:"replies", body: newReply})
					.then(function(data){
						if(data.success){
							alert("추가되었습니다");
							$("#addReplyTPL").html("");
							response.replies.unshift({ content: newReply, userInfo: userInfo, up:0, down:0 });//생성된 그것의 id를 가져올수 있나..?
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

	//학교추가 버튼 클릭시에 학교 검색 폼검증.
	addSchool : function(profileId, response){

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
					name:"한글자 이상의 학교 정보를 검색해주세요."
				},
				submitHandler:function(form,evt){
				
					evt.preventDefault();
				
					var sendingData = $(form).serialize();
					//학교 검색후에 검색된 학교들이 나오고, 옆에 확인버튼을 클릭하면 학교가 추가된다.
					getSchools(sendingData).then(function(data){
						if(data.length){ //검색데이터 결과가 있을시에.
							$("#searchedSchoolsTPL").html(TPL.EPsearchedSchools({searchedList:data}));
							$(".sendData").on('click',function(evt){
								evt.preventDefault();
								var self = $(this);
								var schoolIds = self.attr("schoolId");
								var category = self.attr("category");
								//클릭된 학교의 category별로, defaultClass를 만들어 둔다. 
								var defaultClass = [100, 200, 300]; //고등학교, 중학교반.
								var elementaryClass = [100, 200, 300, 400, 500, 600]; //초등학교 반.
								var classCategory = {"elemantary" : elementaryClass, "middle": defaultClass, "high": defaultClass };
								updateProfile(profileId, {$push: { schools: { school: schoolIds, class: classCategory[category] }}})
								.then(function(data){
									if (data.success){ //성공시에 button에 attr의 schoolName을 response에 추가하고, 다시 랜더링한다.

										alert("수정되었습니다.");
										var inputName = self.attr("schoolName");

										response.schools.push({
											school:{ name: inputName, _id:data.id},
											class: classCategory[category],
										 });

										$("#addSchoolTPL").html("");

										$("#profileTemplate").html(TPL.EPprofile({
											profile: response, // 다시 생성.
										}));
									}
									
								})
							});
						}else{ //검색데이터가 없을시에 noData를 true로 주고 데이터가 없음을 알린다.
							$("#searchedSchoolsTPL").html(TPL.EPsearchedSchools({noData: true}));
						}
					});

					

				}
			});


			$("#cancelAddSchool").on('click',function(evt){
				evt.preventDefault();
				$("#addSchoolTPL").html("");
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
				},
				messages:{
				},
				submitHandler:function(form,evt){
					evt.preventDefault();
					//수정된 반 정보를 보낼 데이터 안에 입력.
					var updateData = { 
						schoolId: schoolId,
						options: "class",
					};
					var categoryNum = {elementary: 6, middle: 3, high: 3};
					var category = $("#updateCategory").val();

					var updatedClass = [];

					for(var i=0; i<categoryNum[category]; i++){
						var classNum = $("#fieldClass"+(i+1)).val();
						updateData["schools.$.class."+i] = classNum;
						updatedClass.push(classNum);
					}
									
					
					updateProfile(profileId, updateData).then(function(data){
						var targetSchool;
						response.schools.map(function(el){
							if (el.school._id === schoolId){
								targetSchool = el;
							}
						})

						targetSchool.class = updatedClass;

						if (data.success){
							alert("수정되었습니다.");
							$("#updateClassTPL").html("");
							$("#profileTPL").html(TPL.EPprofile({
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


















