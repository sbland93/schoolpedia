
var helpers = {
	
	//학교의 category가 'elementary'인지를 확인하는 helper함수.
	isEquals: function(a, b, block){
		
		if( a === b){
			return block.fn(this);
		}

		return block.inverse(this);
	},
	indexLoop : function(array, block){
		var accum = '';
		for(var i = 0; i < array.length; i++){
			accum+=block.fn({
				this : array[i],
				index: i+1,
			})
		}
		return accum;
	},
}

var helperStrings = ["isEquals","indexLoop"];


helperStrings.forEach(function(el){
	Handlebars.registerHelper(el, helpers[el]);
});