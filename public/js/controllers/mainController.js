$(document).ready(function(){

	//ajax로 게시물을 UP(+1) or DOWN(-1)해주는 함수.
	var ajaxUpDown = function(id, upOrDown){
		var data;
		if(upOrDown === "UP") data = {$inc : { up : 1 }};
		else if(upOrDown === "DOWN") data = {$inc : { down : -1 }};
		else return reject("Something Wrong Attempting Now.....!!");
		return new Promise(function(resolve, reject){
			$.ajax({
				url: '/api/board' + '/' + id + '/updown',
				method: 'PUT',
				data : data,
				success: function(rtnData){
					resolve(rtnData);
				},
				fail: function(rtnData){
					reject(rtnData);
				},
			});
		});
	}

	$.validator.addMethod("koreanName", function(value, element) {
	    return this.optional(element) || /^[가-힣]{2,4}$/.test(value);
	}, "두글자에서 네글자 사이의 한국이름을 입력해주세요");

	//UP button을 클릭시에, 데이터베이스에서 +1해주고, participant에 up을 누른 유저를 추가한다.
	$(".upBoard").on('click', function(evt){
		evt.preventDefault();
		var button = $(this);
		var boardId = button.attr("boardId");
		ajaxUpDown(boardId, "UP").then(function(data){
			if(data.success){
				alert("의견(+1)이 반영되었어요");
				var numberOfUp = Number(button.html());
				button.html("+"+(numberOfUp+1));
			}else{
				if(data.type === "Login"){
					alert("로그인이 필요한 서비스에요!");
					return location.href = $("#loginBtn").attr("href");
				}else if(data.type=== "Already"){
					alert("이미 의견이 반영되었어요!");	
				}
			}
		});
	});

	//Down button을 클릭시에, 데이터베이스에서 -1해주고, participant에 down을 누른 유저를 추가한다.
	$(".downBoard").on('click', function(evt){
		evt.preventDefault();
		var button = $(this);
		var boardId = button.attr("boardId");
		ajaxUpDown(boardId, "DOWN").then(function(data){
			if(data.success){
				alert("의견(-1)이 반영되었어요");
				var numberOfDown = Number(button.html());
				button.html(numberOfDown-1);
			}else{
				if(data.type === "Login"){
					alert("로그인이 필요한 서비스에요!");
					return location.href = $("#loginBtn").attr("href");
				}else if(data.type=== "Already"){
					alert("이미 의견이 반영되었어요!");	
				}
			}
		});
	});
	var searchedSchoolList = TPL.HMsearchedSchools;
	var searchedProfileList = TPL.NFsearchedProfileList;
	
	//navBar에 학교검색폼. 
	$(".mainSearchSchoolForm").validate({
		rules:{
			name:{
				minlength:2,
				required:true,
			},
		},
		messages:{
			name:"두글자 이상의 학교명을 입력해주세요.",
		},
		submitHandler:function(form,evt){
			evt.preventDefault();
			var sendingData = $(form).serialize();
			
			getSchools(sendingData).then(function(data){
				if(data.success) return $('#mainSearchResult').html(searchedSchoolList({schoolList : data.schoolList}));
			});
		}
	});

	//navBar에 친구검색폼. 
	$(".mainSearchProfileForm").validate({
		rules:{
			name:{
				required:true,
				minlength:2,
				maxlength:5,
			}
		},
		messages:{
			name:"두글자 이상의 학생이름을 입력해주세요.",
		},
		submitHandler:function(form,evt){
			evt.preventDefault();
			var profileName = $("#mainProfileName").val();
			location.href = "/profile/search?q="+profileName+"&fields=only";
		}
	});



})