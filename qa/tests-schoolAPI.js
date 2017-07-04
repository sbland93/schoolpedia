var expect = require('chai').expect;
var http = require('http');
var rest = require('restler');

/******

	api 계획

	api/school?query - get -> if(!query)available한 school을 모두 가져온다.
	if(query) 해당쿼리에 해당하는 모든 school을 꺼내온다.(보통 이름으로 조사하게 될것.) 
	(성공응답: data Array를 보낸다.)

	api/school/:id - post -> 해당하는 id의 school을 available상태로 만든다.
	(성공 응답: data.id를 보낸다.)
	
	api/school/:id - get -> 해당 id의 school을 하나 가져온다.
	(성공 응답: 해당 data를 보낸다.)

	api/school/:id - delete -> 해당 id의 school의 available을 false로 만든다.
	(성공 응답: data의 success를 true로 넣어서 응답한다.)


******/


describe('School API tests', function(){


	var firstSchool = {
		name: '백영고등학교'
	},
	secondSchool = {
		name: '평촌중학교'
	},
	thirdSchool = {
		name: '평촌초등학교'
	},
	fakeData = {
		name: '승범초등학교'
	};

	var base = 'http://localhost:3000';

	before(function(){
		expect(true).to.be.equal(true);
	});


	after(function(done){
		rest.get(base + '/api/school').on('success',
			function(data){
				var promiseArr = [];
				data.forEach(function(el){
					promiseArr.push(new Promise(function(resolve, reject){
						rest.del(base + '/api/school/' + el.id).on('success', function(data){
							expect(data.success).to.be.equal(true);
							if(data.success) resolve();
						});
					}));
				});
				Promise.all(promiseArr).then(function(){
					done();
				});
			}
		);
	});


	//query를 활용해서 thirdSchool(평촌초등학교)에 해당하는 학교 두개를 가져온다.
	//해당 학교가 두개 있는데(사전조사완료), 두개의 location이 달라야한다.
	it('should be able to get all schools by query', function(done){
		rest.get(base + '/api/school', {query: thirdSchool}).on('success', 
			function(data){
				expect(data.length).to.be.equal(2);
				expect(data[0].name).to.be.equal(data[1].name);
				expect(data[0].location).not.to.be.equal(data[1].location);
				done();
			}
		);
	});


	//query로 firstSchool에 해당하는 학교를 모두 가져온 후,
	//첫데이터의 id를 활용해서 해당학교의 available을 true로 바꾼다.
	it('should be able to make available of school', function(done){
		rest.get(base + '/api/school', { query: firstSchool }).on('success',
			function(data){
				rest.post(base + '/api/school/' + data[0].id).on('success',
					function(_data){
						expect(_data.success).to.be.equal(true);
						done();
					}
				);
			}
		);
	});


	//query 로 secondSchool의 학교들을 가져온후,
	//그중 첫학교의 id를 활용해서 하나의 학교를 가져온다.
	it('should be able to get a school', function(done){
		rest.get(base + '/api/school', {query: secondSchool}).on('success',
			function(data){
				rest.get(base + '/api/school/' + data[0].id).on('success',
					function(_data){
						expect(_data.success).to.be.equal(true);
						expect(_data.name).to.be.equal(secondSchool.name);
						done();
				});
			}
		);
	});



	//api/school/:id - delete -> 해당 id의 school의 available을 false로 만든다.
	//(성공 응답: data의 success를 true로 넣어서 응답한다.)
	it('should be able to delete a school', function(done){
		this.timeout(2500);
		rest.get(base + '/api/school', { query: thirdSchool }).on('success',
			function(data){
				rest.post(base + '/api/school/' + data[0].id).on('success',
					function(_data){
						rest.del(base + '/api/school/' + data[0].id).on('success',
							function(data_){
								expect(data_.success).to.be.equal(true);
								done();
							}
					 	);
					}
				);
			}
		);
	});


	//api/school - get -> available한 school을 모두 가져온다.
	//(성공응답: data Array를 보낸다.)
	it('should be able to get all available schools', function(done){
		rest.get(base + '/api/school/' , {query: secondSchool}).on('success',
			function(rtn){
				rest.post(base + '/api/school/' + rtn[0].id).on('success',
					function(data){
						//post방식으로 thirdSchool을 보내고, get방식으로 모든 avilable을
						//가져왔을때, 그 배열에 thirdSchool이 존재하는지 검사한다.
						rest.get(base + '/api/school').on('success',
							function(_data){
								expect(_data.length >= 1).to.be.equal(true);
								var isThere = _data.some(function(val){
									return val.name === secondSchool.name;
								});
								expect(isThere).to.be.equal(true);
								done();
							}
						);
				});
			}
		);
	});


});