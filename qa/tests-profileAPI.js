var expect = require('chai').expect;
var http = require('http');
var rest = require('restler');
var mongoose = require('mongoose');
var School = require('../models/school.js');
var Profile = require('../models/profile.js');
var credentials = require('../credentials.js');
var seedData = require('../seedData.js');
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

var profileData = {
	highClass: [107, 212, 314],
	name: '김승범',
	graduation: 2012,
	birth: 1993,
	bugName: '도산',
	gender: true,
	stories: [{content: '1-7 반장, 2-12 반장, 3-14 반장' +
	'조금 극단적인 성격' +
	'공부를 열심히 했음'}]
};

describe('Profile API Tests', function(){
	console.log('Please Ensure Make Node_env = "test"');

	//School의 objectId를 위해서, school의 restler를 이용한다.
	//이곳은 좀 refactoring이 필요. profileAPI의 test가 schoolAPI에 의존적 성격을 가지고 있음.
	var schoolDocs, profileDocs;
	var db;
	var base = "http://localhost:3000";

	//mongoose 연결을 확실시 하고, schoolDocs를 초기화시킨다.
	before(function(done){
		this.timeout(1000 * 15);
		//mongoose가  disconnect(0)이면 연결시키고, connected(1)상태이면 넘어간다.
		if(mongoose.connection.readyState === 0){
			mongoose.connect(credentials.mongo.development.connectionString, credentials.mongo.options);

			mongoose.connection.on("open", function(ref) {
				console.log("Connected to mongo server.");
				School.remove({}, function(err){
					expect(err).to.be.equal(null);
					School.create(seedData.testSchoolList, function(err, schools){
						schoolDocs = schools;
						done();
					});
				});
			});
		} else if (mongoose.connection.readyState === 1){
			School.remove({}, function(err){
				expect(err).to.be.equal(null);
				School.create(seedData.testSchoolList, function(err, schools){
					schoolDocs = schools;
					done();
				});
			});
		}
	});
	//매 Test 전마다, Profile모델을 통해서 profile들을 만들고
	//profileDocs전역변수를 초기화한다.
	beforeEach(function(done){
		this.timeout(1000 * 5);
		Profile.remove({}, function(err){
			Profile.create(seedData.profileList, function(err, profiles){
				expect(err).to.be.equal(null);
				profileDocs = profiles;
				done();
			});
		});
	});

	//테스트 독립성 확실을 위해, 다큐먼트들을 클리어한다.
	after(function(done){
		var p1 = new Promise(function(resolve , reject){
			School.remove({}, function(err){
				if(err) reject(err);
				resolve();
			});	
		});
		var p2 = new Promise(function(resolve , reject){
			Profile.remove({}, function(err){
				if(err) reject(err);
				resolve();
			});	
		});
		Promise.all([p1, p2]).then(function(){
			done();
		});
	});


	//api/profile- post -> 요청 본문의 profile을 추가한다.
	//(성공 응답: data.id를 보낸다./ data.success)
	it('should able to add Profile', function(done){
		this.timeout(1000* 10);
		schoolDocs.forEach(function(el){
			switch(el.category){
				case '고등학교':
					if(profileData.highSchool) return;
					profileData.highSchool = (el._id).toString();
					break;
				case '중학교':
					if(profileData.middleSchool) return;
					profileData.middleSchool = (el._id).toString();
					break;
				case '초등학교':
					if(profileData.elementarySchool) return;
					profileData.elementarySchool = (el._id).toString();
					break;
			}
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
	//data.length가 seedData.profileList의 개수와 같은지 확인한다.
	it('should be able to get all profiles', function(done){
		rest.get(base + '/api/profile').on('success',
			function(data){
				expect(data.length).to.be.equal(seedData.profileList.length);
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
		this.timeout(1000* 10);
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
						expect(data.message).to.be.equal('No Data');
						done();
					}
				);
			}
		);
	});

});

