$(document).ready(function(){
	

	//기본 profileID를 가져오기 위한 DOM.
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
	



	//pagination을 실행할, template들과, 그에 따라 필요한 context와, Div의 Tag들의 모음 객체.
	var tplAndContext = {
		
		features: {
			template: TPL.EPfeatures,
			contextFn : function(A){
				var self = A;
				return {
					user: self.user,
					feature: self.feature,
				};
			},
			postsDiv : $('#features'), //템플릿을 넣을 곳.
			dynamicClass : "featuresPG", //템플릿 별로 만들 Class이름. DOM조작에 필요한 Class.
			gotoPageNumber: undefined,
		},

		stories: {
			template: TPL.EPstories,
			contextFn: function(A){
				var self = A;
				return {
					content: self.content,
				};
			},
			postsDiv : $('#stories'),
			dynamicClass : "storiesPG",
			gotoPageNumber: undefined,
		},

		replies: {
			template: TPL.EPreplies,
			contextFn: function(A){
				var self = A;
				return {
					user: self.user,
					content: self.content,
				};
			},
			postsDiv : $('#replies'),
			dynamicClass : "repliesPG",
			gotoPageNumber: undefined,			
		}
	}

	


    //프로필 페이지는 기본적으로 SinglePage기반으로 움직이는데, 제일처음 profileData를 가져서 활용한다.
    getProfile($("#PPdefaultValue").val()).then(function(response){

    	//profile을 ajax를 통해서 가져오는데 성공하면 홈으로 보내고, 실패시에(페이지 이동 및, 없는 데이터, 에러) 홈으로 보낸다.
    	if(response.success){

	    	//기본정보(충호, 이름, 학교, 학급)들받는 프로필.
			var profileTemplate = TPL.EPprofile;
			$('#profileTemplate').html(profileTemplate({
				profile : response,
			}))

			console.log(response);

			var storyData = $(response.stories);
			var featureData = $(response.features);
			var replyData = $(response.replies);

			makePosts(storyData, tplAndContext.stories);
			makePosts(featureData, tplAndContext.features);
			makePosts(replyData, tplAndContext.replies);

			var context = {
				profileId : profileId
			};

			//특징추가하기 버튼을 클릭시에 동적으로 특징 추가 폼을 추가한다.
			$("#addFeature").on('click', function(evt){
				evt.preventDefault();
				var template = TPL.EPaddFeature;
				//특징추가 위한 Form 검증.
				makeDynamicTPL("#addFeatureTPL", TPL.EPaddFeature, context, profileTPLC.addFeature(profileId, response, tplAndContext));				
			});


			//썰추가 버튼은 클릭시에 동적으로 썰 추가 폼을 생성한다.
			$("#addStory").on('click', function(evt){
				evt.preventDefault();
				var template = TPL.EPaddStory;
				//썰추가 위한 Form 검증.
				makeDynamicTPL("#addStoryTPL", TPL.EPaddStory, context, profileTPLC.addStory(profileId, response, tplAndContext));
			});

			//방명록추가 버튼은 클릭시에 동적으로 썰 추가 폼을 생성한다.
			$("#addReply").on('click', function(evt){
				evt.preventDefault();
				var template = TPL.EPaddReply;
				//방명록추가 위한 Form 검증.
				makeDynamicTPL("#addReplyTPL", TPL.EPaddReply, context, profileTPLC.addReply(profileId, response, tplAndContext));
			});
<<<<<<< HEAD
			$("#updateClass").on('click',function(evt){
				evt.preventDefault();
				var updateClassTPL = TPL.EPupdateClass;
				$("#updateClassTPL").html(updateClassTPL(context));
				$("#cancelUpdateClass").on('click',function(evt){
					evt.preventDefault();
					$("#updateClassTPL").html("");
				})
			})
			//학교 추가버튼을 클릭시 학교 검색 폼 
=======

>>>>>>> master
			$("#updateSchool").on('click',function(evt){
				evt.preventDefault();
				var template = TPL.EPupdateSchool;
				$("#updateSchoolTPL").html(template(context));
				$("#cancelUpdateSchool").on('click',function(evt){
					evt.preventDefault();
					$("#updateSchoolTPL").html("");
					
				});
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
											$("#profileTemplate").html(profileTemplate({
												profile: response,
													
												
											}));
										}
										
									})
								});
							}
						});

						

					}
				});

			});
			$("#updateBugName").on('click',function(evt){
				evt.preventDefault();
				var template = TPL.EPupdateBugName;
				
				$("#updateBugNameTPL").html(template(context));

				$("#cancelUpdateBugName").on('click',function(evt){
					
					$("#updateBugNameTPL").html("");
				});

				$(".updateBugName").validate({
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
						var bugName = $("#bugName").val();
						console.log(bugName);
						updateProfile(profileId, sendingData).then(function(data){
							console.log(data);
							if(data.success){
								alert("수정되었습니다.")
								$("#bugNameTPL").html("");
								$(".bugName").html(bugName);
							}
						});
					}
				});
			});
			
    	} else {
    		//페이지 이동시.
    		alert("현재 없는 페이지 같아요, 학생정보가 이동했거나, 삭제된거 같아요ㅠㅠ");
			location.href = "/";
    	}

    }).catch(function(err){
    	console.log(err);
    	location.href = "/";
    });





});