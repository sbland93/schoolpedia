$(document).ready(function(){
	

	//profileId와, isMyPage(마이페이지이면 "true" 아니면 attr가져올게 없으므로 undefined);
	var profileId = $("#defaultVal").attr("profileId");
	var isMyPage = $("#defaultVal").attr("isMyPage");
	console.log("isMyPage:", isMyPage);
	
	$("#removeProfile").on('click', function(evt){
		
		evt.preventDefault();
		deleteProfile(profileId).then(function(data){
			if(data.success) location.href = document.referrer;
			else alert('Error occured');
		}).catch(function(){
			alert('Error occured');
		});
	
	});

	$("#takeProfile").on('click', function(evt){
		var self = this;
		evt.preventDefault();

		//삭제 확인후, 확인버튼 클릭시에, 삭제 진행후에, 전페이지로 이동한다.
		var takeConfirm = confirm("정말 이 페이지의 주인공이 맞나요?");

		if(takeConfirm){
			updateUser($(self).attr("userId"), { profile: profileId }).then(function(data){
				if(data.success){
					alert("개인페이지를 획득하셨습니다!");
					location.reload();
				}else{
					if(data.type === "Login"){
						alert("문제가 생긴것 같습니다..!")
					}else{
						alert("문제가 생긴것 같습니다..!");
					}
				}
			})
		} else{
			return;
		}

	});
	

	//pagination을 실행할, template들과, 그에 따라 필요한 context와, Div의 Tag들의 모음 객체.
	var tplAndContext = {
		
		features: {
			template: TPL.EPfeatures,
			contextFn : function(A){
				var self = A;
				return {
					id: self._id,
					user: self.user,
					feature: self.feature,
					up: self.up,
					down: self.down,
					isMyPage: isMyPage,
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
					id: self._id,
					content: self.content,
					up: self.up,
					down: self.down,
					isMyPage: isMyPage,
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
					id: self._id,
					user: self.user,
					up: self.up,
					down: self.down,
					content: self.content,
					isMyPage: isMyPage,
				};
			},
			postsDiv : $('#replies'),
			dynamicClass : "repliesPG",
			gotoPageNumber: undefined,			
		}
		
	}

	


    //프로필 페이지는 기본적으로 SinglePage기반으로 움직이는데, 제일처음 profileData를 가져서 활용한다.
    getProfile(profileId).then(function(response){

    	//profile을 ajax를 통해서 가져오는데 성공하면 홈으로 보내고, 실패시에(페이지 이동 및, 없는 데이터, 에러) 홈으로 보낸다.
    	if(response.success){

	    	
			makeDynamicTPL("#profileTPL", TPL.EPprofile, {profile: response}, profileTPLC.profile(profileId, response));				

			console.log(response);

			var storyData = $(response.stories);
			var featureData = $(response.features);
			var replyData = $(response.replies);
			//pagination을 위해서 makePosts함수를 사용해서 생성. 
			makePosts(storyData, tplAndContext.stories);
			makePosts(featureData, tplAndContext.features);
			makePosts(replyData, tplAndContext.replies);

			var context = {
				profileId : profileId
			};

			//특징추가하기 버튼을 클릭시에 동적으로 특징 추가 폼을 추가한다.
			$("#addFeature").on('click', function(evt){
				evt.preventDefault();
				//특징추가 위한 Form 검증.
				makeDynamicTPL("#addFeatureTPL", TPL.EPaddFeature, context, profileTPLC.addFeature(profileId, response, tplAndContext));				
			});


			//썰추가 버튼은 클릭시에 동적으로 썰 추가 폼을 생성한다.
			$("#addStory").on('click', function(evt){
				evt.preventDefault();
				//썰추가 위한 Form 검증.
				makeDynamicTPL("#addStoryTPL", TPL.EPaddStory, context, profileTPLC.addStory(profileId, response, tplAndContext));
			});

			//방명록추가 버튼은 클릭시에 동적으로 방명록 추가 폼을 생성한다.
			$("#addReply").on('click', function(evt){
				evt.preventDefault();
				//방명록추가 위한 Form 검증.
				makeDynamicTPL("#addReplyTPL", TPL.EPaddReply, context, profileTPLC.addReply(profileId, response, tplAndContext));
			});


			//학교 추가버튼을 클릭시 학교 검색 폼 
			$("#addSchool").on('click',function(evt){
				evt.preventDefault();
				//학교 추가를 위한 Form 검증.
				makeDynamicTPL("#addSchoolTPL", TPL.EPaddSchool, context, profileTPLC.addSchool(profileId, response));
			});

			//충호를 수정하는 버튼을 클릭시 충호 수정 폼 생성.
			$("#updateBugName").on('click',function(evt){
				evt.preventDefault();
				makeDynamicTPL("#updateBugNameTPL", TPL.EPupdateBugName, context, profileTPLC.updateBugName(profileId));
			});

			//TODO : 이게 여기들어가면 안된다. 비동기 타이밍을잘 맞춰서 위치를 바꾸자
			$(".manageProfile").on('click', function(evt){
				console.log("Click!");
				var self = $(this);
				var target = self.attr("target");
				var targetId = self.attr("targetId");
				var data = { $pull: {} };
				data.$pull[target] = { _id: targetId };
				console.log("data: ", data);
				updateProfile(profileId, data).then(function(data){
					if(data.success){
						alert("삭제했습니다!");
					}else{
						if(data.type === "Login"){
							alert("로그인이 필요한 서비스입니다.");
							return location.href = '/login';
						}
						alert("문제가 생긴것 같습니다!");
					}
				})
			});

			//TODO : 위와 마찬가지. 여기들어가면 안된다. 비동기 타이밍.
			$(".profileUpDown").on('click', function(evt){
				console.log("Click");
				var self = $(this);
				var upOrDown = self.attr("upOrDown");
				var data = {
					target: self.attr("target"),
					targetId: self.attr("targetId"),
					upOrDown: self.attr("upOrDown"),
				};
				upDownProfile(profileId , data).then(function(data){
					console.log("data: ", data);
					if(data.success){
						if(upOrDown === "up"){
							alert("의견(+1)이 반영되었어요");
							var number = Number(self.html());
							self.html("+"+(number+1));
						}else if(upOrDown === "down"){
							alert("의견(-1)이 반영되었어요");
							var number = Number(self.html());
							self.html(number-1);
						}else{
							alert("하는 과정사이에 문제가 발생했어요");	
						}
					}else{
						if(data.type === "Login"){
							alert("로그인이 필요한 서비스에요!");
							location.href = "/login";
						}else if(data.type=== "Already"){
							alert("이미 의견이 반영되었어요!");	
						}
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
//    	location.href = "/";
    });





});