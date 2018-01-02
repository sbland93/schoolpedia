
var helpers = {
	
	iterateOptionWithGrade : function(n, grade, selectedValue, block){
		var accum = '';
		for(var i= 1; i < n; ++i){
			var classNum = (grade*100) + i;
			var data = {
				optionValue : classNum,
				selectedValue: classNum === selectedValue, 
			};
			accum += block.fn(data);
		}
		return accum;
	},

	iterateWithPlus : function(n, plus, block){
		var accum = '';
		for(var i=0; i<n; ++i){
			accum+=block.fn(i+plus);
		}
		return accum;
	},

	iterateForClass : function(n, classArray, block){
		var accum = '';
		for(var i = 0; i < n; ++i){
			accum+=block.fn({
				classIndex: (i+1),
				gradeValue: classArray ? classArray[i] : null,
				gradeNumber: (i+1)*100,
			});
		}
		return accum;
	},
}

var helperStrings = ["iterateOptionWithGrade", "iterateWithPlus", "iterateForClass"];

helperStrings.forEach(function(el){
	Handlebars.registerHelper(el, helpers[el]);
});