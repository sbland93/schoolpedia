$(document).ready(function(){
	//profileId와, isMyPage(마이페이지이면 "true" 아니면 attr가져올게 없으므로 undefined)
	var userInfo, urlNow;
	ajaxAuth().then(function(data){
		urlNow = data.urlNow;
		userInfo = data.userInfo;
	});

	var defaultInput = $("#defaultVal");
	var profileId = defaultInput.attr("profileId");
	var isMyPage = defaultInput.attr("isMyPage");
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

	//pagination을 실행할, template들과, 그에 따라 필요한 context와, Div의 Tag들의 모음 객체.
	var tplAndContext = {
		
		features: {
			template: TPL.EPfeatures,
			contextFn : function(A){
				var self = A;
				return {
					id: self._id,
					content: self.content,
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
					userInfo: self.user,
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
    		//takeProfile은 원래 false인데, user가 profile을 차지하지 않았고, 프로필명과 유저이름이 같다면 페이지를 차지하는 버튼을 만들어주기 위해 true로 바꾼다.
    		var takeProfile = false;
    		if(userInfo !== undefined && !userInfo.profile && response.name === userInfo.name) takeProfile = true;
    		var context = {profile: response, isMyPage: isMyPage, takeProfile: takeProfile };
	    	//처음에는 kakaoInit을 True로 준다.
			makeDynamicTPL("#profileTPL", TPL.EPprofile, context, profileTPLC.profile(profileId, response, true));				

			var storyData = $(response.stories);
			var featureData = $(response.features);
			var replyData = $(response.replies);
			//pagination을 위해서 makePosts함수를 사용해서 생성. 
			//Post가 생성이 완료된후에, 이벤트 등록을 해야하므로, makePost자체는 Promise로 구성.
			var p1 = makePosts(storyData, tplAndContext.stories);
			var p2 = makePosts(featureData, tplAndContext.features);
			var p3 = makePosts(replyData, tplAndContext.replies);


			var context = {
				profileId : profileId
			};

			//특징추가하기 버튼을 클릭시에 동적으로 특징 추가 폼을 추가한다.
			$("#addFeature").on('click', function(evt){
				evt.preventDefault();
				//특징추가 위한 Form 검증.
				makeDynamicTPL("#updateProfileTPL", TPL.EPaddFeature, context, profileTPLC.addFeature(profileId, response, tplAndContext));				
			});


			//썰추가 버튼은 클릭시에 동적으로 썰 추가 폼을 생성한다.
			$("#addStory").on('click', function(evt){
				evt.preventDefault();
				//썰추가 위한 Form 검증.
				makeDynamicTPL("#updateProfileTPL", TPL.EPaddStory, context, profileTPLC.addStory(profileId, response, tplAndContext));
			});

			//방명록추가 버튼은 클릭시에 동적으로 방명록 추가 폼을 생성한다.
			$("#addReply").on('click', function(evt){
				evt.preventDefault();
				//방명록추가 위한 Form 검증.
				makeDynamicTPL("#updateProfileTPL", TPL.EPaddReply, context, profileTPLC.addReply(profileId, response, tplAndContext, userInfo));
			});


			//학교 추가버튼을 클릭시 학교 검색 폼 
			$("#addSchool").on('click',function(evt){
				evt.preventDefault();
				//학교 추가를 위한 Form 검증.
				makeDynamicTPL("#updateProfileTPL", TPL.EPaddSchool, context, profileTPLC.addSchool(profileId, response));
			});


			
    	} else {
    		//페이지 이동시.
    		alert("현재 없는 페이지 같아요, 학생정보가 이동했거나, 삭제된거 같아요ㅠㅠ");
			location.href = "/";
    	}

    }).catch(function(err){
    	console.log(err);
    });





});