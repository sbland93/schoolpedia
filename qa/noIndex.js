var mongoose = require('mongoose');

var randomIntBelow10 = function(){
	return (Math.random() * 10) % 10 ;
}
var schoolSchema = {
	school: mongoose.Types.ObjectId,
	classArray: {type: [], default: [randomIntBelow10(), randomIntBelow10(), randomIntBelow10()]}
};

var arrayIndexSchema = mongoose.Schema({
	schoolArray : {type:  [schoolSchema]},
});


var ArrayIndex = mongoose.model('ArrayIndex', arrayIndexSchema);
module.exports = ArrayIndex;