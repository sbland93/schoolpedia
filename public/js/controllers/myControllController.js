
$(document).ready(function(){

	//개인 정보수정 현재는 졸업년도만.
	$(".myControllPageForm").validate({
		rules:{
	        graduation:{
	        	required: true,
	        	min: 1950,
	        }
		},
		messages:{
			graduation: "1950년 이후로 선택",
		},
		submitHandler:function(form,evt){
			evt.preventDefault();
			var sendingdata = $(form).serialize();
			updateUser(sendingdata).then(function(data){
				if (data.success){
					alert("수정되었습니다.");
					location.reload();
				}else{
					alert("딱히 수정한게 없으신것 아닐까요!?");
				}
			});
		},
	});

	//학교추가버튼을 클릭시에, 생성되는 addSchoolForm
    $("#addSchool").on('click', function(evt){
		evt.preventDefault();
		makeDynamicTPL("#addSchoolTPL", TPL.NFaddSchool, {}, newsFeedTPLC.addSchool());     
    });

    //학교삭제 버튼을 클릭시에, 확인을 묻고, 삭제한다.
    $(".deleteSchool").on('click', function(evt){
    	evt.preventDefault();
    	//삭제 확인후, 확인버튼 클릭시에 학교삭제를 진행하고, 리프레시 시킨다.
		var takeConfirm = confirm("학교삭제를 하시겠습니까?");

		if(takeConfirm){
    		var schoolId = $(this).attr("schoolId");

			updateUser({$pull: {schools: schoolId}}).then(function(data){
	    		if(data.success){
	    			alert("삭제되었습니다");
	    		}else{
	    			alert("무슨 문제가 생긴것 같아요!");
	    		}
	    		return location.reload();
	    	});
		} else{
			return;
		}
    });
    //비밀번호를 변경한다.
    $("#updatePassword").on('click', function(evt){
    	evt.preventDefault();
		makeDynamicTPL("#updatePasswordTPL", TPL.MCupdatePassword, {}, myControllTPLC.updatePassword());     
    })


});