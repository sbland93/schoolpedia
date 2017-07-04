//schoolList class안에 li들이 여러개 존재 해야한다.
describe('"home"page Tests', function() {
	it('page should contain list of schools', function(){
		expect($('.schoolList li').length >= 1).to.be.equal(true);
	});
});