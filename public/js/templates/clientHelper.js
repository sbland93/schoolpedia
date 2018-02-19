
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
				element : array[i],
				index: i+1,
			})
		}
		return accum;
	},
	forLoop : function(n, block){
		var accum = '';
		for(var i=0; i<n; i++){
			accum+=block.fn({index: i});
		}
		return accum;
	},
	//Array안에 있는지 없는지에 따라 렌더링해주는 헬퍼. (ex)반[100, 200, 300]에 있다면 아직 없는거로 하기위해 ) 
	ifDefaultClass : function(element, block){
		if([100, 200, 300, 400, 500, 600].indexOf(element) !== -1){ //defaultClass가 맞다면
			return block.fn(element);
		}else{
			return block.inverse(element);
		}	
	},

	//grade가 n이면, n00~ n20 까지 돌면서, defaultValue인지는 isDefault에 true,false로 넣어준다.
	iterateClass : function(classVal, block){
		var accum = '';
		var grade = Math.round(classVal / 100); //207 이면 2가 return되므로, 학년을 가리킨다.
		var base = grade * 100; //2학년이면 200부터.
		for(var i=base; i< base+20; i++){
			accum +=block.fn({index: i, isDefault: classVal===i});
		}
		return accum;
	},

	math : function(a, which, b){
		console.log("here");
		if(which === "*"){
			return a*b;
		}else if(which === "+"){
			return a+b;
		}else if(which === "-"){
			return a-b;
		}else if(which === "/"){
			return a/b;
		}else if(which === "%"){
			return a%b;
		}
	},

}

var helperStrings = ["isEquals","indexLoop", "forLoop", "ifDefaultClass", "iterateClass", "math"];


helperStrings.forEach(function(el){
	Handlebars.registerHelper(el, helpers[el]);
});