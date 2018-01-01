var schoolData = {
	name: '테스트고등학교',
	location: '경기도교육청',
	category: 'highSchool',
	available: false,
	updated_at: Date.now() + 10000,
};

var boardData = {
	title: '테스트 입니다',
	content: '테스트컨텐츠입니다.',
	updated: Date.now(),
};

var profileData = {
	highClass: [107, 200, 300],
	middleClass: [100,212,300],
	elementaryClass: [100,200,314,400,500,600],
	name: '테스터',
	age: '1993',
	gender: true,
	stories:[{content: '테스트입니다'}] 
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
			updateBoard(id, {content: 'change'}).then(function(data){
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
			getBoards({title: boardData.title}).then(function(data){
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
			updateProfile(id, {gender: false}).then(function(data){
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