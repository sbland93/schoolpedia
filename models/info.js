var mongoose = require('mongoose');

//School의 reference두기.
var infoSchema = mongoose.Schema({
	title: String, //제목
	content: String, //내용
	updated_at: { type: Date, default: Date.now }, //글의 생성시기
});


var Info = mongoose.model('Info', infoSchema);
module.exports = Info;