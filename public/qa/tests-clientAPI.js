var schoolData = {
	name: '백영고등학교',
	location: '경기도교육청',
	category: '고등학교',
	available: false,
	updated_at: Date.now() + 10000,
};

var boardData = 	{
	title: '추억이네요ㅋㅋㅋㅋ',
	content: '다들 졸업하고 잘 지내시는지 궁금합니다 저는 고등학교 시절이 제일 궁금하네요ㅋㅋ',
	updated: Date.now(),
};

var profileData = {
	class: [107, 212, 314],
	name: '김승범',
	age: '1993',
	gender: true,
	description: '1-7 반장, 2-12 반장, 3-14 반장' +
	'조금 극단적인 성격' +
	'공부를 열심히 했음'
};

//School
describe('client API Test', function(){

	describe('schoolAPI Test', function(){
		var id;
		beforeEach(function(done){
			addSchool(schoolData).then(function(data){
				expect(data.success).to.be.equal(true);
				expect(!data.id).to.be.equal(false);
				id = data.id;
				done();
			});
		});

		it('should be able to update School', function(done){
			updateSchool(id, {available: true}).then(function(data){
				expect(data.success).to.be.equal(true);
				done();
			});
		});

		it('should be able to get a school', function(done){
			getSchool(id).then(function(data){
				expect(data.success).to.be.equal(true);
				expect(data.name).to.be.equal(schoolData.name);
				done();
			});
		});

		it('should be able to get by query', function(done){
			getSchools({name: schoolData.name}).then(function(data){
				expect(!data.length).to.be.equal(false);
				expect(data[0].name).to.be.equal(schoolData.name);
				done();
			});
		});

		afterEach(function(done){
			deleteSchool(id).then(function(data){
				expect(data.success).to.be.equal(true);
				done();
			});
		});
	});

	describe('boardAPI Test', function(){
		var schoolId;
		before(function(done){
			addSchool(schoolData).then(function(data){
				expect(data.success).to.be.equal(true);
				expect(!data.id).to.be.equal(false);
				schoolId = data.id;
				boardData.school = schoolId;
				done();
			});
		});

		var id;
		beforeEach(function(done){
			addBoard(boardData).then(function(data){
				expect(data.success).to.be.equal(true);
				expect(!data.id).to.be.equal(false);
				id = data.id;
				done();
			});
		});

		it('should be able to update Board', function(done){
			updateBoard(id, {available: true}).then(function(data){
				expect(data.success).to.be.equal(true);
				done();
			});
		});

		it('should be able to get a school', function(done){
			getBoard(id).then(function(data){
				expect(data.success).to.be.equal(true);
				expect(data.name).to.be.equal(boardData.name);
				done();
			});
		});

		it('should be able to get by query', function(done){
			getBoards({name: boardData.name}).then(function(data){
				console.log(data);
				expect(data.length === 1).to.be.equal(true);
				expect(data[0].name).to.be.equal(boardData.name);
				done();
			});
		});

		afterEach(function(done){
			deleteBoard(id).then(function(data){
				expect(data.success).to.be.equal(true);
				done();
			});
		});

		after(function(done){
			deleteSchool(schoolId).then(function(data){
				expect(data.success).to.be.equal(true);
				done();
			});
		});
	});

	describe('profileAPI Test', function(){
		var id;
		beforeEach(function(done){
			addProfile(profileData).then(function(data){
				expect(data.success).to.be.equal(true);
				expect(!data.id).to.be.equal(false);
				id = data.id;
				done();
			});
		});

		it('should be able to update Profile', function(done){
			updateProfile(id, {available: true}).then(function(data){
				expect(data.success).to.be.equal(true);
				done();
			});
		});

		it('should be able to get a school', function(done){
			getProfile(id).then(function(data){
				expect(data.success).to.be.equal(true);
				expect(data.name).to.be.equal(profileData.name);
				done();
			});
		});

		it('should be able to get by query', function(done){
			getProfiles({name: profileData.name}).then(function(data){
				expect(data.length === 1).to.be.equal(true);
				expect(data[0].name).to.be.equal(profileData.name);
				done();
			});
		});

		afterEach(function(done){
			deleteProfile(id).then(function(data){
				expect(data.success).to.be.equal(true);
				done();
			});
		});
	});


});