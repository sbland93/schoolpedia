//profileList class안에 li들이 여러개 존재 해야한다.
describe('"profile"page Tests', function() {
	it('page should contain list of profiles', function(){
		expect($('.profileList li').length >= 1).to.be.equal(true);
	});
});