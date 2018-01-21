//template, context, tag를 받아 tag안에 template을 context와 함께 생성해주는 함수.
//생성해 준 후에, Template의 컨트롤러를 등록한다.
var makeDynamicTPL = function(tag, template, context, templateCtrl){
		
	$(tag).html(template(context));

	//template Controller를 등록해줘야한다.
	templateCtrl();

}