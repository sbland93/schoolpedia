
//Home Controller 학교리스트 동적으로 생성
$(document).ready(function(){


	var searchedSchoolList = TPL.HMsearchedSchools;
	
	$(".searchSchoolForm").validate({
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
				if(data.success){
					return $('#searchResult').html(searchedSchoolList({schoolList : data.schoolList}));
				}
			});
		}
	});

});

