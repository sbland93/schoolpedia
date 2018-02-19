

//newsFeed View에서 사용하는 동적 Template의 Controller.
//클로저 활용을 위하여, 함수를 리턴한다.
var newsFeedTPLC = {

	addSchool: function(){
		
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
				  name:"한글자 이상입니다리."
				},
				submitHandler:function(form , evt){
					//뉴스피드에서, 학교가 없어 검색후에 학교 추가 버튼을 누를떄 submit.
					evt.preventDefault();
					var sendingData = $(form).serialize();
					//user정보에 학교아이디를 추가하고 성공시에, reload와 함께, 학교게시물을 보여준다.
					getSchools(sendingData).then(function(data){
						if(data.success){
							var NFsearchedSchools = TPL.NFsearchedSchools;
							$("#searchedSchoolsTPL").html(NFsearchedSchools({schoolList : data.schoolList}));
							$(".sendData").on('click',function(evt){
								evt.preventDefault();
								var schoolId = $(this).attr("schoolId");
								updateUser({$push: {schools: schoolId}}).then(function(data){
									if(data.success){
										alert("성공적으로 추가되었습니다!");
										location.reload();
									}else{
										alert("문제가 발생했습니다.")
									}
								});
								$("#addSchoolTPL").html("");
							})
						}
					})
				}
			});

			$("#cancelAddSchool").on('click',function(evt){
				evt.preventDefault();
				$("#addSchoolTPL").html("");
			}); 
		}
	},

}