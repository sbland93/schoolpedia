module.exports = function(){

	//ex) alarmUser 배열안에 user가 있으면 넘기고 없으면 넣어주세요.	
	Array.prototype.pushIfNotExist = function(element){
		console.log("thisBefore:", this);
		if(!element) return;
		if(this.indexOf(element) === -1){
			console.log("없어서 넣는다리");
			this.push(element);
			return true; //넣었으면 true를 리턴.
		}else{
			console.log("있어서 안넣는다리");
			return false; //넣지 못했으면 false를 리턴.
		}
		console.log("thisAfter:", this);
	}

	/*var array = [{ name: "tom", text: "tasty" }];
	var element = { name: "tom", text: "tasty" };
	array.pushIfNotExist(element, function(e) { 
	    return e.name === element.name && e.text === element.text; 
	});*/


}

