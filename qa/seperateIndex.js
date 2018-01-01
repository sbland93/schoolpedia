var mongoose = require('mongoose');

var randomIntBelow10 = function(){
	return Math.floor(Math.random() * 10) + 1;
}

var seperateIndexSchema = mongoose.Schema({
	highSchool : { type: Number, default:randomIntBelow10() ,index: true },
	middleSchool: { type: Number, default:randomIntBelow10() ,index: true },
	elementarySchool: { type: Number, default:randomIntBelow10() ,index: true },
	highClass: {
		type: [Number],
		default: [randomIntBelow10(), randomIntBelow10(), randomIntBelow10()],
	    index : true,
	},
  	middleClass : {
	    type: [Number],
		default: [randomIntBelow10(), randomIntBelow10(), randomIntBelow10()],
	    index : true,
  	},
  	elementaryClass : {
	   	type: [Number],
		default: [randomIntBelow10(), randomIntBelow10(), randomIntBelow10()],
	    index : true,
  	},
 });


var SeperateIndex = mongoose.model('SeperateIndex', seperateIndexSchema);
module.exports = SeperateIndex;