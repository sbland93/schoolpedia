var expect = require('chai').expect;
var http = require('http');
var rest = require('restler');
var mongoose = require('mongoose');
var credentials = require('../credentials.js');
var School = require('../models/school.js');

/******

	api 계획

	api/school?query - get -> if(!query)available한 school을 모두 가져온다.
	if(query) 해당쿼리에 해당하는 모든 school을 꺼내온다.(보통 이름으로 조사하게 될것.) 
	(성공응답: data Array를 보낸다.)

	api/school/:id - put -> 해당하는 id의 school을 available상태로 만든다.
	(성공 응답: data.id를 보낸다.)
	
	api/school/:id - put -> 해당하는 id의 school을 update한다. 요청본문을 보낸다.


	api/school/:id - get -> 해당 id의 school을 하나 가져온다.
	(성공 응답: 해당 data를 보낸다.)

	api/school/:id - delete -> 해당 id의 school의 available을 false로 만든다.
	(성공 응답: data의 success를 true로 넣어서 응답한다.)


	test
	before Each: School Model을 통해서, 두세개의 school documents를 available상태로 만든다.
	after Each: School Model을 통해서, available시켰던 documents들을 false로 만든다.

******/


describe('School API tests', function(){
	
	var schoolData = {
		name: '백영고등학교'
	};

	var schoolLists = [
		'평촌중학교',
		'삼성초등학교',
		'귀인중학교',
	];
	var schoolDocs;
	var base = 'http://localhost:3000';

	before(function(done){
		this.timeout(1000 * 10);
		//mongoose가  disconnect(0)이면 연결시키고, connected(1)상태이면 넘어간다.
		if(mongoose.connection.readyState === 0){
			mongoose.Promise = global.Promise;
			mongoose.connect(credentials.mongo.test.connectionString, credentials.mongo.options);

			mongoose.connection.on("open", function(ref) {
				console.log("Connected to mongo server.");
			 	done();
			});
		}else if(mongoose.connection.readyState === 1){
			done();
		}
	});
			
	//SchoolLists에 들어있는 학교들을 available상태로 만든다.
	beforeEach(function(done){
		this.timeout(10000);
		var schoolListsArray = schoolLists.map(function(el){
			return {
				"name" : el,
			};
		});
		var queryObj = {
			"$or" : schoolListsArray
		};
		School.find(queryObj, function(err, schools){
			var promiseArr = [];
			schoolDocs = schools;
			expect(schools.length > 1).to.be.equal(true);
			schoolDocs.map(function(el){
				el.available = true;
				promiseArr.push(new Promise(function(resolve, reject){
					el.save(function(err){
						if(err) return reject(err);
						resolve();
					});
				}));
			});
			Promise.all(promiseArr).then(function(){
				done();
			});
		});	
	});

	//모든 available한 school들을 false를 만든다.
	afterEach(function(done){
		this.timeout(4000);
		School.find({available: true}, function(err, schools){
			var promiseArr = [];
			expect(schools.length > 1).to.be.equal(true);
			schools.map(function(el){
				el.available = false;
				promiseArr.push(new Promise(function(resolve, reject){
					el.save(function(err){
						if(err) return reject(err);
						resolve();
					});
				}));
			});
			Promise.all(promiseArr).then(function(){
				done();
			});
		});
	});

	//api/school?query - get -> if(!query)available한 school을 모두 가져온다.
	//if(query) 해당쿼리에 해당하는 모든 school을 꺼내온다.(보통 이름으로 조사하게 될것.) 
	//(성공응답: data Array를 보낸다.)
	it('should be able to get all schools by query', function(done){
		rest.get(base + '/api/school', {query: schoolData}).on('success', 
			function(data){
				expect(data.length).to.be.equal(1);
				expect(data[0].name).to.be.equal(schoolData.name);
				done();
			}
		);
	});

	//api/school/:id - put -> 해당하는 id의 school을 available상태로 만든다.
	//너무 종속적이다. 다른 API와 마찬가지로 요청본문을 토대로 update한다.
	//(성공 응답: data.id를 보낸다.)
	var updateQuery = { available: true };
	it('should be able to make available of school', function(done){
		rest.get(base + '/api/school', {query: schoolData}).on('success',
			function(data){
				rest.put(base + '/api/school/' + data[0].id, {data: updateQuery}).on('success',
					function(_data){
						expect(_data.success).to.be.equal(true);
						done();
					}
				);
			}
		);
	});

	//api/school/:id - get -> 해당하는 id의 school을 가져온다.
	//(성공 응답: data.success를 보낸다./ data를 가져온다.)
	it('should be able to get a school', function(done){
		rest.get(base + '/api/school/' + schoolDocs[0]._id).on('success',
			function(data){
				expect(data.success).to.be.equal(true);
				expect(data.name).to.be.equal(schoolDocs[0].name);
				done();
		});
	});

	//api/school/:id - delete -> 해당 id의 school의 available을 false로 만든다.
	//(성공 응답: data의 success를 true로 넣어서 응답한다.)
	it('should be able to delete a school', function(done){
		rest.del(base + '/api/school/' + schoolDocs[0]._id).on('success',
			function(data){
				expect(data.success).to.be.equal(true);
				done();
			}
	 	);	
	});

	//api/school - get -> available한 school을 모두 가져온다.
	//(성공응답: data Array를 보낸다.)
	it('should be able to get all available schools', function(done){
		rest.get(base + '/api/school').on('success',
			function(data){
				expect(data.length).to.be.equal(schoolLists.length);
				var isThere = data.some(function(val){
					return val.name === schoolDocs[0].name;
				});
				expect(isThere).to.be.equal(true);
				done();
			}
		);
	});

});