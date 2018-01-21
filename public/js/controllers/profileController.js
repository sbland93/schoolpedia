$(document).ready(function(){
	
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
	
	/*$('#addStory').on('click', function(evt){
		evt.preventDefault();
		var newStoryContent = $('#newStory').val();
		updateProfile(profileId, {$push: {stories:{content: newStoryContent}}})
		.then(function(data){
			//DOLATER 추가에에대한 Mechanism And Data.success에대한 !처리도 어떻게 해야할지 생각해보자
			//DOLATER TEMPLATE CONTROLLER 분리.
			if(data.success){
				$('#profileStories').append(newStoryContent);
			}
		});
		$('#newStory').val("");
	});*/

	

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

	//한 Pagination당 3개를 보여준다.
    var opts = {
        pageMax: 3,
    }
    
    //loadPost.
    function loadPosts(posts, postsDiv, postsTemplate, contextFn, dynamicClass) {
        postsDiv.empty();
        posts.each(function () {
            var template = postsTemplate;
            var context = contextFn(this);
            var html = template(context);
            postsDiv.append(html);
        });
        hidePrev(dynamicClass);
    }

    function hidePrev(dynamicClass) { $('.pagination '+dynamicClass+' .pagination-prev').hide(); }
    function showPrev(dynamicClass) { $('.pagination '+dynamicClass+' .pagination-prev').show(); }

    function hideNext(dynamicClass) { $('.pagination '+dynamicClass+' .pagination-next').hide(); }
    function showNext(dynamicClass) { $('.pagination '+dynamicClass+' .pagination-next').show(); }

    //pagination관련 함수, Template EPpagination을 만들어주는 함수이기도 하다.
    function paginate(data, page, pageCount, postsDiv, postsTemplate, postsContext, dynamicClass, gotoPageNumber) {
        var template = TPL.EPpagination;
        var context = { pages: range(page,pageCount), dynamicClass: dynamicClass};
        var html = template(context);
        var paginationTag = postsDiv.parent().find("."+dynamicClass);
        paginationTag.length > 0 ? paginationTag.replaceWith(html) : postsDiv.after(html);

        function changePage(page) {
            pageItems.removeClass('active');
            pageItems.filter('[d-page="' + page + '"]').addClass('active');
            loadPosts(data.slice(page * opts.pageMax - opts.pageMax, page * opts.pageMax), postsDiv, postsTemplate, postsContext, dynamicClass);
            paginate(data, page, pageCount, postsDiv, postsTemplate, postsContext, dynamicClass);
            if (gotoPageNumber <= 1) {
                hidePrev(dynamicClass);
            }
        }

        var pageItems = $('.'+dynamicClass+'>li.pagination-page');
        var pageItemsLastPage = $('.'+dynamicClass+' li').length - 2;
        pageItems.removeClass('active');
        pageItems.filter('[d-page="' + page + '"]').addClass('active');

        pageItems.on('click', function (evt) {
            getDataPageNo = this.getAttribute('d-page')
            if(getDataPageNo === "..."){
                getDataPageNo = parseInt($('.'+dynamicClass+'>li.active').attr('d-page')) + 1;
            }
            changePage(getDataPageNo);
            if (getDataPageNo == 1) {
                hidePrev(dynamicClass)
            }
            else if (getDataPageNo == pageItemsLastPage) {
                hideNext(dynamicClass);
            }
            else {
				/*showPrev(dynamicClass);
                showNext(dynamicClass);*/
            }
        });

        $('.'+dynamicClass+'>li.pagination-prev').on('click', function () {
            gotoPageNumber = parseInt($('.'+dynamicClass+'>li.active').attr('d-page')) - 1;
            changePage(gotoPageNumber);
        });

        $('.'+dynamicClass+'>li.pagination-next').on('click', function () {
            gotoPageNumber = parseInt($('.'+dynamicClass+'>li.active').attr('d-page')) + 1;
            if (gotoPageNumber > pageCount) {
                gotoPageNumber = 1;
                showPrev(dynamicClass);
            }
            changePage(gotoPageNumber);
        });
    }

    //실제로 pagination과 post를 엮어서, 하나의 페이지네이션이 완련된 포스팅을 만들어주는 함수.
    //데이터와 객체를 받는다.
    var makePosts = function(data, dataObj){
    	var dataCount = data.length;

        storyPageCount = Math.ceil(dataCount / opts.pageMax);

        if (dataCount > opts.pageMax) {
            paginate(data, 1, storyPageCount, dataObj.postsDiv, dataObj.template, dataObj.contextFn, dataObj.dynamicClass, dataObj.gotoPageNumber);
            posts = data.slice(0, opts.pageMax);
        } else {
            posts = data;
        }
        loadPosts(posts, dataObj.postsDiv, dataObj.template, dataObj.contextFn, dataObj.dynamicClass);
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
				console.log("here");
				evt.preventDefault();
				var template = TPL.EPaddFeature;
				var context = {
					profileId : profileId
				};
				$("#addFeatureTPL").html(template(context));
				//특징추가 위한 Form 검증.
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
						console.log(newFeature);
						console.log("herehere");
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