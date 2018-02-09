$(document).ready(function(){
	var searchedSchoolList = TPL.NFsearchedSchools;
	var searchedProfileList = TPL.NFsearchedProfileList;
	
	$(".searchSchoolForm").validate({
		rules:{
			name:{
				required:true,
				minlength:1,
			},

		},
		messages:{
			name:"한글자 이상입니다.",
		},
		submitHandler:function(form,evt){
			evt.preventDefault();
			var sendingData = $(form).serialize();
			
			getSchools(sendingData).then(function(data){
				console.log(data);
				if(data.length) return $('#searchResult').html(searchedSchoolList({searchedList : data}));
				if(!data.success) return $('#searchResult').html(searchedSchoolList({noData : true}));
			});
		}
	})

	$(".searchProfileForm").validate({
		rules:{
			name:{
				required:true,
				minlength:1,
				maxlength:5,
			}
		},
		messages:{
			name:"한글자 이상입니다.",
		},
		submitHandler:function(form,evt){
			evt.preventDefault();
			var sendingData = $(form).serialize();
			getProfiles(sendingData).then(function(data){
				var defaultSchoolId = $('#schoolId').val();
				if(data.length){
					return $('#searchedProfileListTPL').html(searchedProfileList({
						searchedList : data,
						schoolId : defaultSchoolId, 
					}));
				} 
				if(!data.success) return $('#searchedProfileListTPL').html(searchedProfileList({
					noData : true,
					schoolId : defaultSchoolId, 
				}));
			}).catch(function(err){
				alert(err);
			});
		}
	})


	//학교추가버튼을 클릭시에, 생성되는 addSchoolForm
    $("#addSchool").on('click',function(evt){
		evt.preventDefault();
		makeDynamicTPL("#addSchoolTPL", TPL.NFaddSchool, {}, newsFeedTPLC.addSchool());     
    })

})