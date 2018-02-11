$.fn.serializeObject=function(){"use strict";var a={},b=function(b,c){var d=a[c.name];"undefined"!=typeof d&&d!==null?$.isArray(d)?d.push(c.value):a[c.name]=[d,c.value]:a[c.name]=c.value};return $.each(this.serializeArray(),b),a};
//template, context, tag를 받아 tag안에 template을 context와 함께 생성해주는 함수.
//생성해 준 후에, Template의 컨트롤러를 등록한다.

var makeDynamicTPL = function(tag, template, context, templateCtrl){
		
	$(tag).html(template(context));

	//template Controller를 등록해줘야한다.
	templateCtrl();

}


var replaceBr = function(targetObj, targetValue){
	targetObj[targetValue] = targetObj[targetValue].replace(/\r\n/g,"<br>");
}