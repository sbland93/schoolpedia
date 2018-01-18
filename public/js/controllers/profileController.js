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
	
	$('#addStory').on('click', function(evt){
		evt.preventDefault();
		var newStoryContent = $('#newStory').val();
		updateProfile(profileId, {$push: {stories:{content: newStoryContent}}})
		.then(function(data){
			//DOLATER 추가에에대한 Mechanism And Data.success에대한 !처리도 어떻게 해야할지 생각해보자
			//DOLATER TEMPLATE CONTROLLER 분리.
			if(data.success){
				console.log($('.storyContents').last());
				$('#profileStories').append(newStoryContent);
			}
		});
		$('#newStory').val("");
	});




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
			postsDiv : $('#features'),
			dynamicClass : "featuresPG",
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


    var opts = {
        pageMax: 3,
    }
    
    function loadPosts(posts, postsDiv, postsTemplate, contextFn) {
        postsDiv.empty();
        posts.each(function () {
            var template = postsTemplate;
            var context = contextFn(this);
            var html = template(context);
            postsDiv.append(html);
        });
        hidePrev();
    }

    function hidePrev() { $('.pagination .pagination-prev').hide(); }
    function showPrev() { $('.pagination .pagination-prev').show(); }

    function hideNext() { $('.pagination .pagination-next').hide(); }
    function showNext() { $('.pagination .pagination-next').show(); }

    function paginate(data, page, pageCount, postsDiv, postsTemplate, postsContext, dynamicClass, gotoPageNumber) {
        var template = TPL.EPpagination;
        var context = { pages: range(page,pageCount), dynamicClass: dynamicClass};
        console.log(range(page,pageCount));
        var html = template(context);
        console.log(html);
        var paginationTag = postsDiv.parent().find("."+dynamicClass);
        console.log("."+dynamicClass);
        console.log(paginationTag);
        paginationTag.length > 0 ? paginationTag.replaceWith(html) : postsDiv.after(html);

        function changePage(page) {
            pageItems.removeClass('active');
            pageItems.filter('[d-page="' + page + '"]').addClass('active');
            loadPosts(data.slice(page * opts.pageMax - opts.pageMax, page * opts.pageMax), postsDiv, postsTemplate, postsContext);
            paginate(data, page, pageCount, postsDiv, postsTemplate, postsContext, dynamicClass);
            if (gotoPageNumber <= 1) {
                hidePrev();
            }
        }

        var pageItems = $('.'+dynamicClass+'>li.pagination-page');
        var pageItemsLastPage = $('.'+dynamicClass+' li').length - 2;
        pageItems.removeClass('active');
        pageItems.filter('[d-page="' + page + '"]').addClass('active');

        pageItems.on('click', function () {
            getDataPageNo = this.getAttribute('d-page')
            //console.log(getDataPageNo)
            changePage(getDataPageNo);
            if (getDataPageNo == 1) {
                hidePrev()
            }
            else if (getDataPageNo == pageItemsLastPage) {
                hideNext();
            }
            else {
                showPrev();
                showNext();
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
                showPrev();
            }
            changePage(gotoPageNumber);
        });
    }


    var makePosts = function(data, dataObj){
    	var dataCount = data.length;

        storyPageCount = Math.ceil(dataCount / opts.pageMax);
        //console.log(storyPageCount);

        if (dataCount > opts.pageMax) {
            paginate(data, 1, storyPageCount, dataObj.postsDiv, dataObj.template, dataObj.contextFn, dataObj.dynamicClass, dataObj.gotoPageNumber);
            posts = data.slice(0, opts.pageMax);
            console.log(posts);
        } else {
            posts = data;
        }
        loadPosts(posts, dataObj.postsDiv, dataObj.template, dataObj.contextFn);
    }



    $.ajax({
    	dataType: 'json',
    	url: '/api/profile/'+$('#PPdefaultValue').val(),
    	success: function(response_json){
    		var storyData = $(response_json.stories);
    		var featureData = $(response_json.features);
    		var replyData = $(response_json.replies);

    		makePosts(storyData, tplAndContext.stories);
    		makePosts(featureData, tplAndContext.features);
    		makePosts(replyData, tplAndContext.replies);

    	}
    });




});