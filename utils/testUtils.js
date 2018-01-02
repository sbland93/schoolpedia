module.exports = function(){
	
	return {
		//max이하의 randomInt를 return하는 함수.
		getRandomInt : function(max) {
	 		return Math.floor(Math.random() * max);
		},
	};


}