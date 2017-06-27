var express = require('express');

var app = express();

//static 미들우어는 정적 자원을 담고 있는 하나 이상의 디렉터리를 지목해서
//특별한 처리 없이 클라이언트에 전송 할 수 있도록 해준다.
//여기선 퍼블릭 디렉토리 지정.
app.use(express.static(__dirname + '/public'));



//핸들바 뷰 엔진 설정.
var handlebars = require('express-handlebars')
	.create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');




//포트 지정, 기본 포트는 3000
app.set('port', process.env.PORT || 3000);


//home 페이지 라우팅.
app.get('/', function(req, res){
	res.render('home');
});

//about 페이지 라우팅
app.get('/about', function(req, res){
	res.render('about');
});



//커스텀 404페이지.
app.use(function(req, res){
	//200이 default이므로 바꿔준다.
	res.status(404);
	res.render('404');
});

//커스텀 500 페이지
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.render('500');
});


//해당 미들웨어들을 연결한 후, 서버 실행.
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + 
		app.get('port') + '; press Ctrl+C to terminate');
});