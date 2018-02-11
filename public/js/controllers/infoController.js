$(document).ready(function(){
	$(".createInfoForm").validate({
		rules:{
			title:{
				required:true,
				minlength:1,
			},
			content:{
				required:true,
				minlength:1,
			}
		},
		messages:{
			title:"1글자 ㅎㅇ",
			content:"1글자 ㅎㅇ",
		},
		//공지사항 추가시 동적으로 info 홈페이지에 생성
		submitHandler:function(form,evt){
			evt.preventDefault();
			var contentsObj = $(form).serializeObject();
			replaceBr(contentsObj,"content");
			addInfo(contentsObj).then(function(data){
				if (data.success){
					alert("추가");
					location.href = '/info';
				}
			})
		}
	})
})