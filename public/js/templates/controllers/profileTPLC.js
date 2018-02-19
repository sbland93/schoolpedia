
//profile.handlebars view에서 필요한 TPL에 대한 Controllers.
var profileTPLC = {

	profile: function(profileId, response, isLoggedIn){

		return function(){
			
			//학교링크 클릭시 템플릿 생성.
			$(".updateClass").on('click',function(evt){
				evt.preventDefault();
				if(!isLoggedIn){
					alert("로그인이 필요한 서비스에요 로그인을 부탁드려요");
					return location.href = $("#loginBtn").attr("href");
				}
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

				makeDynamicTPL("#updateProfileTPL", TPL.EPupdateClass, contextHere, profileTPLC.updateClass(profileId, response, schoolId));

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
						if(data.success){ //돌아온 데이터로, 값을 바꾸고 재 렌더링한다.
							alert("추가되었습니다");
							$("#updateProfileTPL").html("");
							response = data.changedDoc;
							var featureData = $(response.features);
							makePosts(featureData, tplAndContext.features);
						} else{
							alert("문제가 생긴것 같아요...!");
							location.reload();
						}
					});
				}
			});

			$('#cancelAddFeature').on('click', function(evt){
				evt.preventDefault();
				$('#updateProfileTPL').html("");
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
							$("#updateProfileTL").html("");
							response = data.changedDoc;
							var storyData = $(response.stories);
							makePosts(storyData, tplAndContext.stories);
						} else{
							alert("문제가 생긴것 같아요...!");
							location.reload();
						}
					});
				}
			});

			$('#cancelAddStory').on('click', function(evt){
				$('#updateProfileTPL').html("");
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
							$("#updateProfileTPL").html("");
							response = data.changedDoc;
							var replyData = $(response.replies);
							makePosts(replyData, tplAndContext.replies);
						} else{
							alert("문제가 생긴것 같아요...!");
							location.reload();
						}
					});
				}
			});

			$('#cancelAddReply').on('click', function(evt){
				evt.preventDefault();
				$('#updateProfileTPL').html("");
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
						minlength:2,
						maxlength:10,
					}
				},
				messages:{
					name:"두글자 이상의 학교 정보를 검색해주세요."
				},
				submitHandler:function(form,evt){
				
					evt.preventDefault();
				
					var sendingData = $(form).serialize();
					//학교 검색후에 검색된 학교들이 나오고, 옆에 확인버튼을 클릭하면 학교가 추가된다.
					getSchools(sendingData).then(function(data){
						if(data.success){ //검색데이터 결과가 있을시에.
							$("#searchedSchoolsTPL").html(TPL.EPsearchedSchools({schoolList:data.schoolList}));
							$(".sendData").on('click',function(evt){
								evt.preventDefault();
								var self = $(this);
								var schoolId = self.attr("schoolId");
								var category = self.attr("category");
								//클릭된 학교의 category별로, defaultClass를 만들어 둔다. 
								var defaultClass = [100, 200, 300]; //고등학교, 중학교반.
								var elementaryClass = [100, 200, 300, 400, 500, 600]; //초등학교 반.
								var classCategory = {"elementary" : elementaryClass, "middle": defaultClass, "high": defaultClass };
								var data = {$push : { schools: { school: schoolId, class: classCategory[category] }}};
								data["options"] = { conditions : {"schools.school" : {"$ne": schoolId}} };
								updateProfile(profileId, data)
								.then(function(data){
									if (data.success){ //성공시에 button에 attr의 schoolName을 response에 추가하고, 다시 랜더링한다.

										alert("수정되었습니다.");
										$("#updateProfileTPL").html("");
										response = data.changedDoc;
										makeDynamicTPL("#profileTPL", TPL.EPprofile, {profile: response}, profileTPLC.profile(profileId, response, true));				

									}else{
										alert("문제가 생긴것 같아요...!");
										location.reload();
									}
									
								})
							});
						}
					});

					

				}
			});


			$("#cancelAddSchool").on('click',function(evt){
				evt.preventDefault();
				$("#updateProfileTPL").html("");
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
				submitHandler:function(form , evt){
					evt.preventDefault();
					//수정된 반 정보를 보낼 데이터 안에 입력.
					console.log("$(form).serializeObject()", $(form).serializeObject());
					var updateData = { 
						options: {
							conditions: { "schools.school" : schoolId }
						},
						"schools.$.class" : $(form).serializeObject().class,
					};

					updateProfile(profileId, updateData).then(function(data){

						if (data.success){

							alert("수정되었습니다.");
							$("#updateProfileTPL").html("");
							response = data.changedDoc;
							makeDynamicTPL("#profileTPL", TPL.EPprofile, {profile: response}, profileTPLC.profile(profileId, response, true));				

						}else{

							alert("무슨 문제가 생긴것 같아요...");
							location.reload();

						}
					})
				}
			});

			$("#cancelUpdateClass").on('click',function(evt){
				evt.preventDefault();
				$("#updateProfileTPL").html("");
			});	


		}
	},


}


















