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

			var storyData = $(response.stories);
			var featureData = $(response.features);
			var replyData = $(response.replies);

			makePosts(storyData, tplAndContext.stories);
			makePosts(featureData, tplAndContext.features);
			makePosts(replyData, tplAndContext.replies);

			//특징추가하기 버튼을 클릭시에 동적으로 특징 추가 폼을 추가한다.
			$("#addFeature").on('click', function(evt){
				evt.preventDefault();
				var template = TPL.EPaddFeature;
				var context = {
					profileId : profileId
				};
				//$("#addFeatureTPL").html(template(context));
				//특징추가 위한 Form 검증.
				makeDynamicTPL("#addFeatureTPL", TPL.EPaddFeature, context, profileTPLC.addFeature);				
			});

    	} else{
    		//페이지 이동시.
    		alert("현재 없는 페이지 같아요, 학생정보가 이동했거나, 삭제된거 같아요ㅠㅠ");
			location.href = "/";
    	}

    }).catch(function(err){
    	console.log(err);
    	location.href = "/";
    })




});