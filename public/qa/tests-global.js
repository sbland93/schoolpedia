//Global Tests

//페이지에 유효한 타이틀이 있는지 검사한다.
describe('Global Tests', function() {
	it('page has a valid title', function(){
		expect(document.title && document.title.match(/\S/) &&
			document.title.toUpperCase() !== 'TODO').to.be.equal(true);
	});
});