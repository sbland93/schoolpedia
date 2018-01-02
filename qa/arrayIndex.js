var mongoose = require('mongoose');

var randomIntBelow10 = function(){
	return Math.floor(Math.random() * 10) + 1;
}
var schoolSchema = {
	school: { type: Number, default:randomIntBelow10(), index: true },
	classArray: {type: [Number], default: [randomIntBelow10(), randomIntBelow10(), randomIntBelow10()], index: true}
};

var defaultSchema = {school: randomIntBelow10(), classArray: [randomIntBelow10(), randomIntBelow10(), randomIntBelow10()]};

var arrayIndexSchema = mongoose.Schema({
	schoolArray : {type:  [schoolSchema], default: [defaultSchema, defaultSchema, defaultSchema], index: true}
});


var ArrayIndex = mongoose.model('ArrayIndex', arrayIndexSchema);
module.exports = ArrayIndex;