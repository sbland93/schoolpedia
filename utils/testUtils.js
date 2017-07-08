module.exports = function(){
	
	return {
		getRandomInt : function getRandomInt(min, max) {
	 		return Math.floor(Math.random() * (max - min)) + min;
		},
	};


}