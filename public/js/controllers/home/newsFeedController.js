$(document).ready(function(){

	//학교추가버튼을 클릭시에, 생성되는 addSchoolForm
    $("#addSchool").on('click',function(evt){
		evt.preventDefault();
		makeDynamicTPL("#addSchoolTPL", TPL.NFaddSchool, {}, newsFeedTPLC.addSchool());     
    });

});