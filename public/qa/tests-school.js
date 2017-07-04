

//school page에는 profileList와 boardList둘다 존재해야한다.
describe('"school"page Tests', function() {
	it('page should contain list of profiles', function(){
		expect($('.profileList li').length >= 1).to.be.equal(true);
	});

	it('page should contain list of boards', function(){
		expect($('.boardList li').length >= 1).to.be.equal(true);
	});

});

