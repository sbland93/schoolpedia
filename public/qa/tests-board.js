//Board Page Test
//게시판이 나와야한다.
describe('"board"page Tests', function() {
	it('page should contain list of Boards', function(){
		expect($('.boardList li').length >= 1).to.be.equal(true);
	});
});