var expect = require('chai').expect;
var http = require('http');
var rest = require('restler');
var mongoose = require('mongoose');
var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var credentials = require('../credentials.js');
/******

	api 계획

	api/profile?query - get -> if(!query) profile을 모두 가져온다.
	if(query) 해당쿼리에 해당하는 모든 profile을 꺼내온다.(보통 이름으로 조사하게 될것.) 
	(성공응답: data Array를 보낸다.)

	api/profile- post -> 요청 본문의 profile을 추가한다.
	(성공 응답: data.id를 보낸다./ data.success)
	
	api/profile/:id - get -> 해당 id의 profile을 하나 가져온다.
	(성공 응답: 해당 data를 보낸다. / data.success)

	api/profile/:id - put -> 해당 id의 profile을 요청본문을 토대로 업데이트.
	(성공 응답: data.success/ 업데이트된 data);

	api/profile/:id - delete -> 해당 id의 profile 삭제.
	(성공 응답: data.success)

	******/
var schoolLists = [
		'평촌초등학교',
		'평촌중학교',
		'백영고등학교',
		'삼성초등학교',
		'귀인중학교',
	];

var profileData = {
	class: [107, 212, 314],
	name: '김승범',
	age: '1993',
	gender: true,
	description: '1-7 반장, 2-12 반장, 3-14 반장' +
	'조금 극단적인 성격' +
	'공부를 열심히 했음'
};


var profileLists = [ 
{
	class: [107, 203, 307],
	name: '임태환',
	age: '1993',
	gender: true,
	description: '전교부회장 역임' +
	'지조로 유명했음' +
	'공부를 열심히 했음' +
	'관련일화: 반전체 눈치게임을 하는데, 끝까지 일어나지 않아서 45번으로 벌칙에 걸렸다는 일화..',
	replies : [{user: '21jij234', content: '역시 임지조.'}, 
	{user: '42qjk455', content: '최근에 태환이랑 연락되는 사람 있나요? 보고싶네ㅋㅋㅋ'}],
}, 
{
	class: [111, 212, 310],
	name: '김인경',
	age: '1993',
	gender: false,
	description: '털털하고 시원한 성격의 인구' +
	'별명이 인구였는데 왜 인구가 되었는지는 아무도 모르고 있음.' +
	'아는사람 업데이트 바람.',
	replies : [{user: '49kik5k9', content: '인경이 요즘 뭐하고 지내나ㅋㅋㅋ'}, 
	{user: '89828sk', content: '분명히 이거 보고 모른척 했을듯 인구'}],
}, 
{
	class: [101, 201, 314],
	name: '김재환',
	age: '1991',
	gender: true,
	description: '성격 좋고 노래 잘함' +
	'얼굴이 큰 편이여서 대두, 대갈장군 등의 이름을 가지고 있었음.' +
	'3학년때 장난기가 많은 편이였음.',
	replies : [{user: '8391eifk', content: '동생이 아마 백영고 였을걸?'}, 
	{user: '6726001', content: '장수현쌤일때 같은반이였는데 성격 ㄱㅊ'}],
}];


describe('Profile API Tests', function(){

	var opts = {
		server: {
			socketOptions: { keepAlive: 1 }
		}
	};

	mongoose.connect(credentials.mongo.test.connectionString, opts);


	//School의 objectId를 위해서, school의 restler를 이용한다.
	//이곳은 좀 refactoring이 필요. profileAPI의 test가 schoolAPI에 의존적 성격을 가지고 있음.
	var schoolDocs, profileDocs;

	//SchoolList를 Model에서 찾아낸 후, schoolDocs를 초기화한다.
	before(function(done){
		this.timeout(4000);
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

	//매 Test 전마다, Profile모델을 통해서 profile들을 만들고
	//profileDocs전역변수를 초기화한다.
	beforeEach(function(done){
		this.timeout(4000);
		Profile.create(profileLists, function(err, profiles){
			expect(err).to.be.equal(null);
			profileDocs = profiles;
			done();
		});
	});

	//매 Test가 끝난 후, Profile모델을 통해서 profile들을 삭제한다.
	afterEach(function(done){
		this.timeout(4000);
		Profile.remove({}, function(err){
			expect(err).to.be.equal(null);
			done();
		});
	});



	var base = "http://localhost:3000";

	//api/profile- post -> 요청 본문의 profile을 추가한다.
	//(성공 응답: data.id를 보낸다./ data.success)
	//일단 school의 objectId를 알아야하는데, 이걸 어떻게 테스트 해야 할지.
	it('should able to add Profile', function(done){
		profileData.school = [];
		schoolDocs.forEach(function(el){
			profileData.school.push(el.id);
		});
		rest.post(base + '/api/profile', {data: profileData}).on('success',
			function(data){
				expect(data.success).to.be.equal(true);
				done();
			}
		);
	});


	//api/profile- get -> query에 해당하는 profile을 가져온다.
	//query가 없으면 모든 profile을 가져온다.
	//data.length가 profileList의 개수와 같은지 확인한다.
	it('should be able to get all profiles', function(done){
		rest.get(base + '/api/profile').on('success',
			function(data){
				expect(data.length).to.be.equal(profileLists.length);
				done();
			}
		);
	});

	//api/profile/:id - get -> :id에 해당하는 profile을 가져온다.
	//data.success이 true인지 확인한다.
	it('should be able to get a profile', function(done){
		rest.get(base + '/api/profile/' + profileDocs[0]._id).on('success',
			function(data){
				expect(data.success).to.be.equal(true);
				expect(data.name).to.be.equal(profileDocs[0].name);
				done();
			}
		);
	});

	//api/profile/:id - put -> :id에 해당하는 profile을 요청본문을 통해 업데이트.
	//data.success가 true인지 확인.
	//업데이트 된 데이터의 property 확인.
	it('should be able to update a profile', function(done){
		rest.put(base + '/api/profile/' + profileDocs[0]._id, {data: profileData}).on('success',
			function(data){
				expect(data.success).to.be.equal(true);
				done();
			}
		);
	});

	//api/profile/:id - delete -> :id에 해당하는 profile을 삭제한다.
	//data.success가 true인지 확인.
	//해당 data가 삭제됐는지, get방식 query로 확인.
	it('should be able to delete a profile', function(done){
		rest.del(base + '/api/profile/' + profileDocs[0]._id).on('success',
			function(data){
				expect(data.success).to.be.equal(true);
				rest.get(base + '/api/profile/' + profileDocs[0]._id).on('success',
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

