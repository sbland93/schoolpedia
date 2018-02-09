//credentials보안파일 로드
var credentials = require('./credentials.js');
var express = require('express');

var fs = require('fs');
//날자포맷을 위한 handlebars helper에 사용할 라이브러리.
var moment = require('moment')

//passport 관련 설정
var passport = require("passport");

var app = express();
//Model들 로드.
var Boards = require('./models/board.js');
var Profiles = require('./models/profile.js');
var Schools = require('./models/school.js');
var Users = require('./models/user.js')


//uncaughtError를 처리하기 위해서 domain생성 후 연결.
app.use(function(req, res, next){
	// 이 요청을 처리할 도메인 생성
	var domain = require('domain').create();

	//도메인에서 일어난 에러 처리
	domain.on('error', function(err){
		console.error('DOMAIN ERROR CAUGHT\n', err.stack);
		try{
			//5초후에 안전한 셧다운
			setTimeout(function(){
				console.error('Failsafe shutdown.');
				process.exit(1);
			}, 5000);

			//클러스터 연결 해제.
			var worker = require('cluster').worker;
			if(worker) worker.disconnect();


			//요청을 받는 것을 중지.
			app.get('server').close();
			
			try{
				//익스프레스의 에러 라우트 시도
				next(err);

			} catch (errFromRoute) {
				//익스프레스의 에러 라우트가 실패하면
				//일반 노드 응답 사용
				console.error('Express error mechanism failed.\n', errFromRoute.stack);
				res.statusCode = 500;
				res.setheader('content-type', 'text/plain');
				res.end('Server Error.');
			}
		} catch (errFrom500Response){

			console.error('Unable to send 500 response. \n', errFrom500Response.stack);
		
		}
	});

	//도메인에 요청과 응답 객체 추가.
	domain.add(req);
	domain.add(res);

	//나머지 요청 체인을 도메인에서 처리
	domain.run(next);
});


//개발환경에 따른 morgan, express-logger 따로 설정.
switch(app.get('env')){

	case 'development' :
		app.use(require('morgan')('dev'));
		break;
	case 'production' :
		app.use(require('express-logger')({
			path: __dirname + '/log/requests.log'
		}));
		break;
	default:
		app.use(require('morgan')('dev'));
		break;
}

//몽구스 설정.
var mongoose = require('mongoose');
var opts = {
	keepAlive: 1,
};
mongoose.Promise = global.Promise;

//개발 환경에 따른 몽구스 연결.
//DOLATER
switch(app.get('env')){
	
	case 'development' : 
		mongoose.connect(credentials.mongo.development.connectionString, opts);
		//데이터 초기화 및 생성.
		//매번 독립적으로 같은 데이터를 생성하기위해, 모두 삭제후 생성.
		require('./seed.js').development();
		break;
	case 'production' :
		mongoose.connect(credentials.mongo.production.connectionString, opts);
		break;
	//test환경에서는, 완전히 독립적이게 유지하는게 좋을것이다.
	case 'test' :
		mongoose.connect(credentials.mongo.test.connectionString, opts);
		require('./seed.js').test();
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}


//static 미들우어는 정적 자원을 담고 있는 하나 이상의 디렉터리를 지목해서
//특별한 처리 없이 클라이언트에 전송 할 수 있도록 해준다.
//여기선 퍼블릭 디렉토리 지정.
app.use(express.static(__dirname + '/public'));


//핸들바 뷰 엔진 설정.
var handlebars = require('express-handlebars').create({
	defaultLayout: 'main',
	helpers: {
		
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		},

		//home.handlebars에서 사용할 함수.
		//n-for-Loop의 역할, context는 index는 1부터.
		forLoop : function(n, block){
			var accum = '';
			for(var i = 0; i < n; i++){
				accum+=block.fn({
					index: i+1,
				})
			}
			return accum;
		},

		//학교의 category가 'elementary'인지를 확인하는 helper함수.
		isEquals: function(a, b, block){
			if((typeof(a) === "object") && (typeof(b)==="object")){
				if(a.equals && a.equals(b)){
					return block.fn(this);
				}
			} else{
				if(a == b){
					return block.fn(this);
				}
			}
			
			return block.inverse(this);
		},
		
		iterateFromTo: function(from, to, block){
			var accum = '';
			for(var i=from; i<=to; i++){
				accum+=block.fn({
					index: i,
				});
			}
			return accum;
		},

		//board들의 content가 너무 길때, 잘라서 ...을 붙여 보내는 helper.
		trimString: function(passedString){
			console.log(typeof(passedString));
			if(typeof(passedString) === "string" && passedString.length > 100 ){
				return passedString.substring(0, 97) + "...";
			}
			return passedString;
		},

		dateFormat : function(date){
			console.log(typeof(date));
			console.log(typeof(moment(date).format('YYYY-MM-DD')));
			if(typeof(date) === "object"){
				return moment(date).format('MM-DD HH:MM');
			}
		},

	},
});



app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


//포트 지정, 기본 포트는 3000
app.set('port', process.env.PORT || 3000);

//쿠키 설정및 접근을 위한 쿠키파서 링크
//세션 연결 req.session을 확장한다.
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
	resave: false,
	saveUninitialized: false,
	secret: credentials.cookieSecret
}));



//PassPort(Authentication관련 설정) - 이것은 express-session을 이용하기 때문에
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);


//세션에 플레시 메시지가 있으면, 뷰컨텍스트에 전달하고, 삭제한다.
//없으면 자동으로 null이되므로, 맞다.
//무언가 잘못된게 있으면 session에 flash메세지를 담아서 보낸다.
app.use(function(req, res, next){
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});

//요청본문 파싱을 위한 바디파서 링크
//req.body를 확장시킨다
app.use(require('body-parser').urlencoded({extended: true}));

//URL매개변수로, 쿼리스트링에 test=1이 있으면
//페이지 테스트 실시 'production'모드에선 미실시.
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test === '1';
	next();
});

app.use(function(req, res, next){
	console.log(req.user);
	//로그인 되어있는 상태라면, isLoggedIn(Handlebar context)에 true를 담아준다.
	if(req.user){
		res.locals.isLoggedIn = true;
		res.locals.userInfo = {
			id: req.user._id,
			name: req.user.name,
			profile: req.user.profile,
			schools: req.user.schools,
		};
	}
	next();
});
//모든 routing 로드.
require('./routes/routes.js')(app);

//커스텀 404페이지.
app.use(function(req, res, next){
	//200이 default이므로 바꿔준다.
	res.status(404);
	res.render('404');
});

//커스텀 500 페이지
app.use(function(err, req, res, next){
	console.error('Error handler is coming....',err.stack);
	res.type('text/html');
	res.status(500);
	res.render('500');
});

//clustering을 대비한 서버 시작 설정
function startServer() {
	//해당 미들웨어들을 연결한 후, 서버 실행.
	var server = app.listen(app.get('port'), function(){
		console.log('Express started in ' + app.get('env') + 
			' mode on http://localhost: ' + app.get('port') +
			 ' ; press Ctrl+C to terminate');
	});
	app.set('server', server);
}

//직접 실행할 경우.
if(require.main === module){
	startServer();
} else {
	//require를 통해 애플리케이션을 모듈처럼 가져옵니다.
	//함수를 반환해서 서버를 생성합니다.
	module.exports = startServer;
}
