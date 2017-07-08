var expect = require('chai').expect;
var http = require('http');
var rest = require('restler');
var mongoose = require('mongoose');
var School = require('../models/school.js');
var Board = require('../models/board.js');
var credentials = require('../credentials.js');
/******

	api 계획

	api/board?query - get -> if(!query) board를 모두 가져온다.
	if(query) 해당쿼리에 해당하는 모든 board를 꺼내온다.(보통 이름으로 조사하게 될것.) 
	(성공응답: data Array를 보낸다.)

	api/board- post -> 요청 본문의 board를 추가한다.
	(성공 응답: data.id를 보낸다./ data.success)
	
	api/board/:id - get -> 해당 id의 board를 하나 가져온다.
	(성공 응답: 해당 data를 보낸다. / data.success)

	api/board/:id - put -> 해당 id의 board를 요청본문을 토대로 업데이트.
	(성공 응답: data.success/ 업데이트된 data);

	api/board/:id - delete -> 해당 id의 board 삭제.
	(성공 응답: data.success)

	var boardSchema = mongoose.Schema({
		user: String,
		school: { type: mongoose.Schema.ObjectId, ref: 'School' },
		title: String,
		content: String,
		updated: { type: Date, default: Date.now },
		replies: [ replySchema ],
	});

	******/
var schoolLists = [
		'평촌초등학교',
		'평촌중학교',
		'백영고등학교',
		'삼성초등학교',
		'귀인중학교',
	];

var boardData = 	{
	title: '추억이네요ㅋㅋㅋㅋ',
	content: '다들 졸업하고 잘 지내시는지 궁금합니다 저는 고등학교 시절이 제일 궁금하네요ㅋㅋ',
	updated: Date.now(),
};


var boardLists = [		
	{
		title: '1학년때 김준선생님 담임이였는데..',
		content: '잘계시는지 궁금하네요ㅋㅋㅋㅋ 이상한 애니메이션 보여주던 기억이 납니다.',
		updated: Date.now(),
	},
	{
		title: '체육대회 3일이던 시절 분들 여기 계신가요? 기수로는..',
		content: '기수로는 언젠지 모르겠는데, 한창 저희 체육대회 겸 축제 재밌다고 주변 학교에 소문났던시절인데....',
		updated: Date.now(),
	},
	{
		title: '이페이지는 누가 만든건가요',
		content: '짐작가는 사람이 있긴한데 ㅅㅂ... 누구지...ㅅㅂ?',
		updated: Date.now(),
	},


];



describe('Board API Tests', function(){


	//School의 objectId를 위해서, school의 restler를 이용한다.
	//이곳은 좀 refactoring이 필요. profileAPI의 test가 schoolAPI에 의존적 성격을 가지고 있음.
	var schoolDocs, boardDocs;
	var db;

	//mongoose 연결을 확실시 하고, schoolDocs를 초기화시킨다.
	before(function(done){
		this.timeout(1000 * 10);
		//mongoose가  disconnect(0)이면 연결시키고, connected(1)상태이면 넘어간다.
		console.log(mongoose.connection.readyState);
		if(mongoose.connection.readyState === 0){
			var opts = {
					server: {
						socketOptions: { keepAlive: 1 }
					}
				};
			mongoose.connect(credentials.mongo.test.connectionString, credentials.mongo.options);

			mongoose.connection.on("open", function(ref) {
				console.log("Connected to mongo server.");
				var schoolListsArray = schoolLists.map(function(el){
					return {
						"name" : el,
					};
				});
				var queryObj = {
					"$or" : schoolListsArray
				};
				School.find(queryObj, function(err, schools){
					schoolDocs = schools;
					expect(schools.length > 1).to.be.equal(true);
					done();
				});	
			});
		} else if (mongoose.connection.readyState === 1){
				var schoolListsArray = schoolLists.map(function(el){
					return {
						"name" : el,
					};
				});
				var queryObj = {
					"$or" : schoolListsArray
				};
				School.find(queryObj, function(err, schools){
					schoolDocs = schools;
					expect(schools.length > 1).to.be.equal(true);
					done();
				});	
		}
	});

	//우선 school부분을 채워줘야한다.
	//매 Test 전마다, Board모델을통해 documents를 완전삭제후,
	//boardDocs 전역변수를 초기화한다.
	beforeEach(function(done){
		this.timeout(4000);
		//단순히좀더 다양한 학교를 넣어 보고 싶어서!
		boardLists.forEach(function(el, index){
			if(schoolDocs[index]){
				el.school = schoolDocs[index]._id;
				return;
			} 
			el.school = schoolDocs[0]._id;
		});
		Board.remove({}, function(err){
			Board.create(boardLists, function(err, boards){
				expect(err).to.be.equal(null);
				boardDocs = boards;
				done();
			});
		});
	});



	var base = "http://localhost:3000";

	//api/board- post -> 요청 본문의 board를 추가한다.
	//(성공 응답: data.id를 보낸다./ data.success)
	//일단 school의 objectId를 알아야하는데, 이걸 어떻게 테스트 해야 할지.
	it('should able to add Board', function(done){
		boardData.school = (schoolDocs[0]._id).toString();
		rest.post(base + '/api/board', {data: boardData}).on('success',
			function(data){
				expect(data.success).to.be.equal(true);
				done();
			}
		);
	});


	//api/board- get -> query에 해당하는 board를 가져온다.
	//query가 없으면 모든 board를 가져온다.
	//data.length가 boardLists의 개수와 같은지 확인힌다.
	//school Schema가 populate되어있는지 확인한다.
	it('should be able to get all boards', function(done){
		rest.get(base + '/api/board').on('success',
			function(data){
				expect(data.length).to.be.equal(boardLists.length);
				//DOLATER -refactoring below line.
				expect(!(data[0].school.name)).to.be.equal(false);
				done();
			}
		);
	});

	//api/board/:id - get -> :id에 해당하는 board를 가져온다.
	//data.success이 true인지 확인한다.
	it('should be able to get a board', function(done){
		rest.get(base + '/api/board/' + boardDocs[0]._id).on('success',
			function(data){
				expect(data.success).to.be.equal(true);
				expect(data.title).to.be.equal(boardDocs[0].title);
				done();
			}
		);
	});

	//api/board/:id - put -> :id에 해당하는 board를 요청본문을 통해 업데이트.
	//data.success가 true인지 확인.
	//업데이트 된 데이터의 property 확인.
	it('should be able to update a board', function(done){
		rest.put(base + '/api/board/' + boardDocs[0]._id, {data: boardData}).on('success',
			function(data){
				expect(data.success).to.be.equal(true);
				done();
			}
		);
	});

	//api/board/:id - delete -> :id에 해당하는 board를 삭제한다.
	//data.success가 true인지 확인.
	//해당 data가 삭제됐는지, get방식 query로 확인.
	it('should be able to delete a board', function(done){
		rest.del(base + '/api/board/' + boardDocs[0]._id).on('success',
			function(data){
				expect(data.success).to.be.equal(true);
				rest.get(base + '/api/board/' + boardDocs[0]._id).on('success',
					function(data){
						expect(data.success).to.be.equal(false);
						expect(data.message).to.be.equal('NO DATA');
						done();
					}
				);
			}
		);
	});



});

