
var helpers = {
	
	//학교의 category가 'elementary'인지를 확인하는 helper함수.
	isEquals: function(a, b, block){
		
		if( a === b){
			return block.fn(this);
		}

		return block.inverse(this);
	},
}

var helperStrings = ["isEquals"];

helperStrings.forEach(function(el){
	Handlebars.registerHelper(el, helpers[el]);
});